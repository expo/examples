import { Pressable, Text, View } from 'react-native'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import tw from '@/lib/tailwind'
import { useTranslation } from 'react-i18next'
import useColorModeRefresh from '@/hooks/useColorModeRefresh'
import { useNavigation } from '@react-navigation/native'
import { EnvelopeIcon } from 'react-native-heroicons/outline'
import useAnalytics from '@/hooks/useAnalytics'

export default function CheckEmailScreen() {
  useColorModeRefresh()
  useAnalytics()
  const { t } = useTranslation()
  const navigation = useNavigation<any>()
  return (
    <>
      <DefaultLayout>
        <View
          style={tw`flex h-full flex-col items-center justify-start py-18 sm:px-6 lg:px-8`}
        >
          <View style={tw`sm:mx-auto sm:w-full sm:max-w-md`}>
            <EnvelopeIcon
              style={tw`w-24 h-24 mx-auto text-gray-900 dark:text-gray-50`}
            />
            <Text
              style={tw`font-loaded-bold mt-6 text-center text-3xl tracking-tight text-gray-900 dark:text-white`}
            >
              {t('confirmEmail')}
            </Text>
            <Text
              style={tw`px-2 mt-2 text-center text-sm text-gray-600 dark:text-gray-300`}
            >
              {t('thanksForRequest')}
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <Text
                style={tw`mt-2 py-2 text-center font-loaded-medium text-indigo-500 dark:text-indigo-200`}
              >
                {t('backToLogin')}
              </Text>
            </Pressable>
          </View>
        </View>
      </DefaultLayout>
    </>
  )
}
