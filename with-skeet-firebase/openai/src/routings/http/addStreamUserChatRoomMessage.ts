import { onRequest } from 'firebase-functions/v2/https'
import { TypedRequestBody } from '@/index'
import { updateChildCollectionItem } from '@skeet-framework/firestore'
import { sleep } from '@/utils/time'
import {
  getUserAuth,
  generateChatRoomTitle,
  streamChat,
  CreateChatCompletionRequest,
} from '@/lib'
import { publicHttpOption } from '@/routings'
import { AddStreamUserChatRoomMessageParams } from '@/types/http/addStreamUserChatRoomMessageParams'
import { defineSecret } from 'firebase-functions/params'
import {
  User,
  UserChatRoom,
  userChatRoomCollectionName,
  userCollectionName,
  createUserChatRoomMessage,
  getMessages,
  getUserChatRoom,
} from '@/models'

const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')

export const addStreamUserChatRoomMessage = onRequest(
  { ...publicHttpOption, secrets: [chatGptOrg, chatGptKey] },
  async (req: TypedRequestBody<AddStreamUserChatRoomMessageParams>, res) => {
    const organization = chatGptOrg.value()
    const apiKey = chatGptKey.value()

    try {
      if (!organization || !apiKey)
        throw new Error(
          `ChatGPT organization or apiKey is empty\nPlease run \`skeet add secret CHAT_GPT_ORG/CHAT_GPT_KEY\``
        )

      // Get Request Body
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // Get User Info from Firebase Auth
      const user = await getUserAuth(req)

      // Get UserChatRoom
      const userChatRoom = await getUserChatRoom(user.uid, body.userChatRoomId)
      if (userChatRoom.data.stream === false)
        throw new Error('stream must be true')

      // Add UserChatRoomMessage
      await createUserChatRoomMessage(userChatRoom.ref, user.uid, body.content)

      // Get UserChatRoomMessages for OpenAI Request
      const messages = await getMessages(user.uid, body.userChatRoomId)

      console.log('messages.length', messages.length)
      // Update UserChatRoom Title
      if (messages.length === 2) {
        const title = await generateChatRoomTitle(
          body.content,
          organization,
          apiKey
        )
        await updateChildCollectionItem<UserChatRoom, User>(
          userCollectionName,
          userChatRoomCollectionName,
          user.uid,
          body.userChatRoomId,
          { title }
        )
      }

      // Send Request to OpenAI
      const openAiBody: CreateChatCompletionRequest = {
        model: userChatRoom.data.model,
        max_tokens: userChatRoom.data.maxTokens,
        temperature: userChatRoom.data.temperature,
        n: 1,
        top_p: 1,
        stream: userChatRoom.data.stream,
        messages,
      }

      // Get OpenAI Stream
      const stream = await streamChat(
        openAiBody,
        chatGptOrg.value(),
        chatGptKey.value()
      )
      const messageResults: string[] = []
      let streamClosed = false
      res.once('error', () => (streamClosed = true))
      res.once('close', () => (streamClosed = true))
      stream.on('data', async (chunk: Buffer) => {
        const payloads = chunk.toString().split('\n\n')
        for await (const payload of payloads) {
          if (payload.includes('[DONE]')) return
          if (payload.startsWith('data:')) {
            const data = payload.replaceAll(/(\n)?^data:\s*/g, '')
            try {
              const delta = JSON.parse(data.trim())
              const message = delta.choices[0].delta?.content
              if (message == undefined) continue

              console.log(message)
              messageResults.push(message)

              while (!streamClosed && res.writableLength > 0) {
                await sleep(10)
              }

              // Send Message to Client
              res.write(JSON.stringify({ text: message }))
            } catch (error) {
              console.log(`Error with JSON.parse and ${payload}.\n${error}`)
            }
          }
        }
        if (streamClosed) res.end('Stream disconnected')
      })

      // Stream End
      stream.on('end', async () => {
        const message = messageResults.join('')
        const lastMessage = await createUserChatRoomMessage(
          userChatRoom.ref,
          user.uid,
          message,
          'assistant'
        )
        console.log(`Stream end - messageId: ${lastMessage.id}`)
        res.end('Stream done')
      })
      stream.on('error', (e: Error) => console.error(e))
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
