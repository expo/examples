import { getChildCollectionItem } from '@skeet-framework/firestore'
import {
  User,
  UserChatRoom,
  userChatRoomCollectionName,
  userCollectionName,
} from '@/models'

export const getUserChatRoom = async (
  userId: string,
  userChatRoomId: string
) => {
  try {
    const userChatRoom = await getChildCollectionItem<UserChatRoom, User>(
      userCollectionName,
      userChatRoomCollectionName,
      userId,
      userChatRoomId
    )
    if (!userChatRoom) throw new Error('userChatRoom not found')

    return userChatRoom
  } catch (error) {
    throw new Error(`getUserChatRoom: ${error}`)
  }
}
