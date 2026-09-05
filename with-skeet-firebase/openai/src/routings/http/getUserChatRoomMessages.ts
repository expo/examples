import { onRequest } from 'firebase-functions/v2/https'
import { TypedRequestBody } from '@/index'
import { GetUserChatRoomMessagesParams } from '@/types/http/getUserChatRoomParams'
import { publicHttpOption } from '@/routings/options'
import { getUserAuth } from '@/lib/getUserAuth'
import { getMessages } from '@/models/lib/getMessages'

export const getUserChatRoomMessages = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<GetUserChatRoomMessagesParams>, res) => {
    try {
      const user = await getUserAuth(req)
      const body = {
        userId: user.uid,
        userChatRoomId: req.body.userChatRoomId,
      }
      const messages = await getMessages(user.uid, body.userChatRoomId)
      res.json({
        status: 'success',
        messages,
      })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
