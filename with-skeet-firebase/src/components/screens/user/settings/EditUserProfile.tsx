import tw from '@/lib/tailwind'
import clsx from 'clsx'
import { View, Pressable, Text, Modal, Platform } from 'react-native'
import { PencilSquareIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useEffect, useMemo } from 'react'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import Button from '@/components/common/atoms/Button'
import { usernameSchema } from '@/utils/form'
import { TextInput } from 'react-native-gesture-handler'
import { auth, db } from '@/lib/firebase'
import Toast from 'react-native-toast-message'
import { doc, updateDoc } from 'firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'

export default function EditUserProfile() {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useRecoilState(userState)

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const validateUsername = useCallback(() => {
    try {
      usernameSchema.parse(username)
      setUsernameError('')
    } catch (err) {
      setUsernameError('usernameErrorText')
    }
  }, [username, setUsernameError])

  useEffect(() => {
    if (username.length > 0) validateUsername()
  }, [username, validateUsername])

  const submit = useCallback(async () => {
    if (db && usernameError == '') {
      try {
        setLoading(true)
        const docRef = doc(db, 'User', user.uid)
        await updateDoc(docRef, { username })
        setUser({
          ...user,
          username,
        })
        Toast.show({
          type: 'success',
          text1: t('settings.updateProfileSuccess') ?? 'Profile Updated',
          text2:
            t('settings.updateProfileSuccessMessage') ??
            'Successfully updated your profile.',
        })
      } catch (err) {
        console.error(err)
        if (
          err instanceof Error &&
          (err.message.includes('Firebase ID token has expired.') ||
            err.message.includes('Error: getUserAuth'))
        ) {
          Toast.show({
            type: 'error',
            text1: t('errorTokenExpiredTitle') ?? 'Token Expired.',
            text2: t('errorTokenExpiredBody') ?? 'Please sign in again.',
          })
          if (auth) {
            signOut(auth)
          }
        } else {
          Toast.show({
            type: 'error',
            text1: t('settings.updateProfileError') ?? 'Update Error',
            text2:
              t('settings.updateProfileErrorMessage') ??
              'Something went wrong... Please try again later.',
          })
        }
      } finally {
        setIsModalOpen(false)
        setLoading(false)
      }
    }
  }, [t, username, usernameError, user, setUser])

  const isDisabled = useMemo(
    () => !(username.length > 0) || isLoading || usernameError != '',
    [username, isLoading, usernameError]
  )

  return (
    <>
      <View style={tw`p-4 text-center sm:text-left`}>
        <Text
          style={tw`font-loaded-bold text-3xl text-gray-900 dark:text-gray-50`}
        >
          {user.username}
        </Text>
        <Text style={tw`font-loaded-medium text-gray-500 dark:text-gray-300`}>
          {user.email}
        </Text>
      </View>
      <View style={tw`p-2 flex flex-row justify-center sm:justify-start`}>
        <Pressable
          style={tw`${clsx(
            'flex flex-row items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-50'
          )}`}
          onPress={() => {
            setIsModalOpen(true)
          }}
        >
          <PencilSquareIcon style={tw`${clsx('mr-3 h-6 w-6 flex-shrink-0')}`} />
          <Text
            style={tw`py-2 font-loaded-medium text-gray-900 dark:text-gray-50`}
          >
            {t('settings.editProfile')}
          </Text>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false)
        }}
      >
        <SafeAreaView
          style={tw`${clsx(Platform.OS === 'ios' && 'pt-10', 'w-full h-full')}`}
        >
          <View
            style={tw`w-full h-screen flex flex-col bg-white dark:bg-gray-900`}
          >
            <View style={tw`flex flex-row items-center justify-center p-4`}>
              <LogoHorizontal className="w-24" />
              <View style={tw`flex-grow`} />
              <Pressable
                onPress={() => {
                  setIsModalOpen(false)
                }}
                style={({ pressed }) =>
                  tw`${clsx(
                    pressed ? 'bg-gray-50 dark:bg-gray-800' : '',
                    'w-5 h-5'
                  )}`
                }
              >
                <XMarkIcon
                  style={tw`w-5 h-5 text-gray-900 dark:text-gray-50`}
                />
              </Pressable>
            </View>
            <View style={tw`flex flex-grow flex-col pt-10 gap-8`}>
              <Text style={tw`text-center font-loaded-bold text-lg`}>
                {t('settings.editProfile')}
              </Text>
              <View style={tw`w-full sm:mx-auto sm:max-w-md`}>
                <View style={tw`px-4 sm:px-10 gap-6`}>
                  <View>
                    <Text
                      style={tw`text-sm font-loaded-medium leading-6 text-gray-900 dark:text-gray-50`}
                    >
                      {t('username')}
                      {usernameError !== '' && (
                        <Text
                          style={tw`text-red-500 dark:text-red-300 text-xs`}
                        >
                          {' : '}
                          {t(usernameError)}
                        </Text>
                      )}
                    </Text>
                    <View style={tw`mt-2`}>
                      <TextInput
                        style={tw`w-full border-2 border-gray-900 dark:border-gray-50 p-3 text-lg font-loaded-bold text-gray-900 dark:text-white sm:leading-6`}
                        inputMode="text"
                        value={username}
                        onChangeText={setUsername}
                      />
                    </View>
                  </View>

                  <View>
                    <Button
                      onPress={() => {
                        submit()
                      }}
                      disabled={isDisabled}
                      className={clsx(
                        isDisabled
                          ? 'bg-gray-300 dark:bg-gray-800 dark:text-gray-400'
                          : '',
                        'w-full px-3 py-2'
                      )}
                    >
                      <Text
                        style={tw`text-center font-loaded-bold text-lg text-white dark:text-gray-900`}
                      >
                        {t('register')}
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
}
