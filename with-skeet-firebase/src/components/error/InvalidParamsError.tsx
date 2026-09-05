import tw from '@/lib/tailwind'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import Button from '@/components/common/atoms/Button'
import { useNavigation } from '@react-navigation/native'

export default function InvalidParamsError() {
  const { t } = useTranslation()
  const navigation = useNavigation<any>()
  return (
    <>
      <View style={tw`h-full`}>
        <View
          style={tw`grid min-h-screen place-items-center py-24 px-6 sm:py-32 lg:px-8`}
        >
          <View style={tw`-translate-y-32 text-center`}>
            <Text
              style={tw`text-3xl font-loaded-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl`}
            >
              {t('invalidParamsErrorTitle')}
            </Text>
            <Text
              style={tw`text-base font-loaded-normal tracking-tight text-gray-900 dark:text-gray-50 sm:text-2xl`}
            >
              {t('invalidParamsErrorBody')}
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
      </View>
    </>
  )
}
