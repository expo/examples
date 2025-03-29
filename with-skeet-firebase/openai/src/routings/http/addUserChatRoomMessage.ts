import { onRequest } from 'firebase-functions/v2/https'
import { TypedRequestBody } from '@/index'
import { updateChildCollectionItem } from '@skeet-framework/firestore'
import {
  chat,
  getUserAuth,
  generateChatRoomTitle,
  CreateChatCompletionRequest,
} from '@/lib'
import { AddUserChatRoomMessageParams } from '@/types/http/addUserChatRoomMessageParams'
import { publicHttpOption } from '@/routings/options'
import {
  User,
  UserChatRoom,
  userChatRoomCollectionName,
  userCollectionName,
  createUserChatRoomMessage,
  getMessages,
  getUserChatRoom,
} from '@/models'
import { defineSecret } from 'firebase-functions/params'

const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')

export const addUserChatRoomMessage = onRequest(
  { ...publicHttpOption, secrets: [chatGptOrg, chatGptKey] },
  async (req: TypedRequestBody<AddUserChatRoomMessageParams>, res) => {
    const organization = chatGptOrg.value()
    const apiKey = chatGptKey.value()
    try {
      if (!organization || !apiKey)
        throw new Error('ChatGPT organization or apiKey is empty')
      const body = {
        userChatRoomId: req.body.userChatRoomId ?? '',
        content: req.body.content,
        isFirstMessage: req.body.isFirstMessage ?? false,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')
      const user = await getUserAuth(req)

      const userChatRoom = await getUserChatRoom(user.uid, body.userChatRoomId)
      if (!userChatRoom) throw new Error('userChatRoom not found')
      if (userChatRoom.data.stream === true)
        throw new Error('stream must be false')

      await createUserChatRoomMessage(userChatRoom.ref, user.uid, body.content)

      const messages = await getMessages(user.uid, body.userChatRoomId)
      let openAiBody: CreateChatCompletionRequest = {
        model: userChatRoom.data.model,
        max_tokens: userChatRoom.data.maxTokens,
        temperature: userChatRoom.data.temperature,
        n: 1,
        top_p: 1,
        stream: userChatRoom.data.stream,
        messages,
      }
      const openAiResponse = await chat(openAiBody, organization, apiKey)
      if (!openAiResponse) throw new Error('openAiResponse not found')
      const content = String(openAiResponse.content) || ''

      await createUserChatRoomMessage(
        userChatRoom.ref,
        user.uid,
        content,
        'assistant'
      )
      if (messages.length === 3) {
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
      res.json({ status: 'success', openAiResponse })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
