import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { Request } from 'firebase-functions/v2/https'

export interface TypedRequestBody<T> extends Request {
  body: T
}

dotenv.config()
admin.initializeApp()

export {
  root,
  authOnCreateUser,
  createUserChatRoom,
  getUserChatRoomMessages,
  addUserChatRoomMessage,
  addStreamUserChatRoomMessage,
} from '@/routings'
