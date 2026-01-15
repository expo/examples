import { View } from 'react-native'
import UserLayout from '@/layouts/user/UserLayout'
import tw from '@/lib/tailwind'

import useColorModeRefresh from '@/hooks/useColorModeRefresh'
import useAnalytics from '@/hooks/useAnalytics'
import ChatMenu, {
  ChatRoom,
} from '@/components/screens/user/openAiChat/ChatMenu'
import ChatBox from '@/components/screens/user/openAiChat/ChatBox'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'
import { useTranslation } from 'react-i18next'
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Toast from 'react-native-toast-message'

export default function UserOpenAiChatScreen() {
  useColorModeRefresh()
  useAnalytics()
  const { t } = useTranslation()

  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false)
  const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(
    null
  )

  const user = useRecoilValue(userState)

  const [chatList, setChatList] = useState<ChatRoom[]>([])
  const [lastChat, setLastChat] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [isDataLoading, setDataLoading] = useState(false)

  const getChatRooms = useCallback(async () => {
    if (db) {
      try {
        setDataLoading(true)
        const q = query(
          collection(db, `User/${user.uid}/UserChatRoom`),
          orderBy('createdAt', 'desc'),
          limit(15)
        )

        const querySnapshot = await getDocs(q)
        const list: ChatRoom[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          list.push({ id: doc.id, ...data } as ChatRoom)
        })
        setChatList(list)
        setLastChat(querySnapshot.docs[querySnapshot.docs.length - 1])
        setDataLoading(false)
      } catch (err) {
        console.log(err)
        if (err instanceof Error && err.message.includes('permission-denied')) {
          Toast.show({
            type: 'error',
            text1: t('errorTokenExpiredTitle') ?? 'Token Expired.',
            text2: t('errorTokenExpiredBody') ?? 'Please sign in again.',
          })
        } else {
          Toast.show({
            type: 'error',
            text1: t('errorTitle') ?? 'Error',
            text2:
              t('errorBody') ?? 'Something went wrong... Please try it again.',
          })
        }
      }
    }
  }, [user.uid, t, setDataLoading, setChatList, setLastChat])

  useEffect(() => {
    getChatRooms()
  }, [getChatRooms])

  return (
    <>
      <UserLayout>
        <View style={tw`flex flex-col items-start justify-start sm:flex-row`}>
          <ChatMenu
            isNewChatModalOpen={isNewChatModalOpen}
            setNewChatModalOpen={setNewChatModalOpen}
            currentChatRoomId={currentChatRoomId}
            setCurrentChatRoomId={setCurrentChatRoomId}
            chatList={chatList}
            setChatList={setChatList}
            lastChat={lastChat}
            setLastChat={setLastChat}
            isDataLoading={isDataLoading}
            setDataLoading={setDataLoading}
            getChatRooms={getChatRooms}
          />
          <ChatBox
            setNewChatModalOpen={setNewChatModalOpen}
            currentChatRoomId={currentChatRoomId}
            getChatRooms={getChatRooms}
          />
        </View>
      </UserLayout>
    </>
  )
}
