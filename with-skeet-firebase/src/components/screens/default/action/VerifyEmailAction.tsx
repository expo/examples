import ActionLoading from '@/components/loading/ActionLoading'
import tw from '@/lib/tailwind'
import { View, Text } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { auth } from '@/lib/firebase'
import { applyActionCode } from 'firebase/auth'
import Button from '@/components/common/atoms/Button'
import { CheckCircleIcon } from 'react-native-heroicons/outline'

type Props = {
  oobCode: string
}

export default function VerifyEmailAction({ oobCode }: Props) {
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()
  const navigation = useNavigation<any>()

  const verifyUser = useCallback(async () => {
    try {
      if (!auth) throw new Error('auth not initialized')
      await applyActionCode(auth, oobCode)
      Toast.show({
        type: 'success',
        text1: t('verifySuccessTitle') ?? 'Verify Success',
        text2: t('verifySuccessBody') ?? 'Welcome to Skeet App Template🎉',
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      Toast.show({
        type: 'error',
        text1: t('verifyErrorTitle') ?? 'Verify Error',
        text2:
          t('verifyErrorBody') ??
          'Something went wrong... Please try it again later.',
      })
      navigation.navigate('Login')
    }
  }, [navigation, t, oobCode])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  if (isLoading) {
    return (
      <>
        <ActionLoading />
      </>
    )
  }

  return (
    <>
      <View style={tw`w-full h-full flex-col items-center justify-center`}>
        <View style={tw`sm:mx-auto sm:w-full sm:max-w-md`}>
          <CheckCircleIcon
            style={tw`w-24 h-24 mx-auto text-green-500 dark:text-green-300`}
          />
          <Text
            style={tw`font-loaded-bold mt-6 text-center text-3xl tracking-tight text-gray-900 dark:text-white`}
          >
            {t('confirmDoneTitle')}
          </Text>
          <Text
            style={tw`px-2 mt-2 text-center text-sm text-gray-600 dark:text-gray-300`}
          >
            {t('confirmDoneBody')}
          </Text>
          <View style={tw`mt-8 flex items-center justify-center gap-x-6`}>
            <Button
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <Text
                style={tw`text-center font-loaded-bold text-lg text-white dark:text-gray-900`}
              >
                {t('backToLogin')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}
