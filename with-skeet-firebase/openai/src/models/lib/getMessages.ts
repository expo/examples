import {
  limit,
  order,
  queryGrandChildCollectionItem,
} from '@skeet-framework/firestore'
import {
  User,
  UserChatRoom,
  UserChatRoomMessage,
  userChatRoomCollectionName,
  userChatRoomMessageCollectionName,
  userCollectionName,
} from '@/models'
import { ChatCompletionRequestMessage } from 'openai'

export const getMessages = async (
  userId: string,
  userChatRoomId: string,
  limitCount?: number
) => {
  try {
    const query: any[] = [order('createdAt', 'desc')]
    if (limitCount) {
      query.push(limit(limitCount))
    }
    const userChatRoomMessages = await queryGrandChildCollectionItem<
      UserChatRoomMessage,
      UserChatRoom,
      User
    >(
      userCollectionName,
      userChatRoomCollectionName,
      userChatRoomMessageCollectionName,
      userId,
      userChatRoomId,
      query
    )
    const messages = []
    for await (const message of userChatRoomMessages) {
      messages.push({
        role: message.data.role,
        content: message.data.content,
      } as ChatCompletionRequestMessage)
    }
    return messages.reverse()
  } catch (error) {
    throw new Error(`getUserChatRoomMessages: ${error}`)
  }
}
