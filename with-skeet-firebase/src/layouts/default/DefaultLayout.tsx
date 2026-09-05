import LanguageChanger from '@/components/utils/LanguageChanger'
import tw from '@/lib/tailwind'
import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Pressable, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ColorModeChanger from '@/components/utils/ColorModeChanger'
import useColorModeRefresh from '@/hooks/useColorModeRefresh'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import clsx from 'clsx'

type Props = {
  children: ReactNode
}
export default function DefaultLayout({ children }: Props) {
  useColorModeRefresh()
  const navigation = useNavigation()

  return (
    <>
      <View style={tw`relative w-full h-full bg-white dark:bg-gray-900`}>
        <SafeAreaView
          style={tw`bg-white dark:bg-gray-900 min-h-screen max-h-screen`}
        >
          <KeyboardAvoidingView
            behavior="position"
            style={tw`flex-1 h-full bg-white dark:bg-gray-900`}
            keyboardVerticalOffset={Platform.OS === 'web' ? 0 : -80}
          >
            <View style={tw`h-24 w-full bg-white dark:bg-gray-900`}>
              <View
                style={tw`flex flex-row items-center justify-between p-6 md:justify-start md:gap-10`}
              >
                <View style={tw`flex flex-1`}>
                  {navigation.canGoBack() && (
                    <>
                      <Pressable
                        onPress={() => {
                          navigation.goBack()
                        }}
                        style={({ pressed }) =>
                          tw`${clsx(
                            pressed ? 'bg-gray-50 dark:bg-gray-800' : '',
                            'w-5 h-5'
                          )}`
                        }
                      >
                        <ArrowLeftIcon style={tw`w-5 h-5 dark:text-gray-50`} />
                      </Pressable>
                    </>
                  )}
                </View>
                <View style={tw`flex flex-row items-center justify-end gap-6`}>
                  <LanguageChanger />
                  <ColorModeChanger />
                </View>
              </View>
            </View>
            {children}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  )
}
