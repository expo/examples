import tw from '@/lib/tailwind'
import { useCallback } from 'react'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { LanguageIcon } from 'react-native-heroicons/outline'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu'

export default function LanguageChanger() {
  const { i18n } = useTranslation()

  const changeLanguage = useCallback(
    async (lang: string) => {
      await i18n.changeLanguage(lang)
    },
    [i18n]
  )
  return (
    <>
      <Menu>
        <MenuTrigger customStyles={tw`w-6 h-6`}>
          <LanguageIcon style={tw`w-5 h-5 text-gray-700 dark:text-gray-200`} />
        </MenuTrigger>
        <MenuOptions>
          <View style={tw`shadow-lg dark:bg-gray-900`}>
            <MenuOption
              onSelect={() => {
                changeLanguage('en-US')
              }}
              style={tw`p-3`}
            >
              <Text
                style={{
                  ...tw`font-loaded-medium text-gray-900 dark:text-gray-50`,
                }}
              >
                English
              </Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                changeLanguage('ja-JP')
              }}
              style={tw`p-3 border-t-gray-50 dark:border-t-gray-800 border-t`}
            >
              <Text
                style={{
                  ...tw`font-loaded-medium text-gray-900 dark:text-gray-50`,
                }}
              >
                日本語
              </Text>
            </MenuOption>
          </View>
        </MenuOptions>
      </Menu>
    </>
  )
}
