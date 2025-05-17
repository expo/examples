import {
  User,
  UserChatRoom,
  UserChatRoomMessage,
  userChatRoomCollectionName,
  userChatRoomMessageCollectionName,
  userCollectionName,
} from '@/models'
import { Ref, addGrandChildCollectionItem } from '@skeet-framework/firestore'

export const createUserChatRoomMessage = async (
  userChatRoomRef: Ref<UserChatRoom>,
  userId: string,
  content: string,
  role = 'user'
) => {
  try {
    const newMessage: UserChatRoomMessage = {
      userChatRoomRef,
      role,
      content,
    }
    return await addGrandChildCollectionItem<
      UserChatRoomMessage,
      UserChatRoom,
      User
    >(
      userCollectionName,
      userChatRoomCollectionName,
      userChatRoomMessageCollectionName,
      userId,
      userChatRoomRef.id,
      newMessage
    )
  } catch (error) {
    throw new Error(`createUserChatRoomMessage: ${error}`)
  }
}
