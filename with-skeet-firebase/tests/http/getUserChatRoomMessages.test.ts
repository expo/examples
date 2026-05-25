import { AddUserChatRoomMessageParams } from '@/types/http/openai/addUserChatRoomMessageParams'
import { postFetch } from '../jest.setup'
import { CreateUserChatRoomParams } from '@/types/http/openai/createUserChatRoomParams'

let userChatRoomId = ''
describe('getUserChatRoomMessages', () => {
  it('createUserChatRoom', async () => {
    const requestBody: CreateUserChatRoomParams = {
      model: 'gpt-3.5-turbo',
      systemContent:
        'This is a great chatbot. This Assistant is very kind and helpful.',
      maxTokens: 50,
      temperature: 1,
      stream: false,
    }
    const endpoint = '/createUserChatRoom'
    const response = await postFetch<CreateUserChatRoomParams>(
      endpoint,
      requestBody
    )
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data).toEqual(
      expect.objectContaining({
        status: 'success',
        userChatRoomRef: expect.any(Object),
        userChatRoomMessageRef: expect.any(Object),
      })
    )
    userChatRoomId = data.userChatRoomRef.id
  })

  it('addUserChatRoomMessage', async () => {
    const requestBody: AddUserChatRoomMessageParams = {
      userChatRoomId,
      content: 'Hello Test!',
    }
    const endpoint = '/addUserChatRoomMessage'
    const response = await postFetch<AddUserChatRoomMessageParams>(
      endpoint,
      requestBody
    )
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data).toEqual(
      expect.objectContaining({
        status: 'success',
      })
    )
  })
})
