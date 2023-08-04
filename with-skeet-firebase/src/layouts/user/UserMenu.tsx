import tw from '@/lib/tailwind'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu'
import { useNavigation } from '@react-navigation/native'
import useLogout from '@/hooks/useLogout'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'
import { Image } from 'expo-image'
import { blurhash } from '@/utils/placeholder'

export default function UserMenu() {
  const { t } = useTranslation()
  const navigation = useNavigation<any>()
  const logout = useLogout()

  const { iconUrl } = useRecoilValue(userState)

  return (
    <>
      <Menu>
        <MenuTrigger customStyles={tw`w-8 h-8 md:w-10 md:h-10`}>
          <Image
            source={iconUrl === '' ? null : iconUrl}
            placeholder={blurhash}
            contentFit="cover"
            style={tw`w-8 h-8 md:w-10 md:h-10 rounded-full`}
          />
        </MenuTrigger>
        <MenuOptions>
          <View style={tw`shadow-lg dark:bg-gray-900`}>
            <MenuOption
              onSelect={() => {
                navigation.navigate('Settings')
              }}
              style={tw`p-3`}
            >
              <Text
                style={tw`font-loaded-medium text-gray-900 dark:text-gray-50`}
              >
                {t('settings.title')}
              </Text>
            </MenuOption>
            <MenuOption
              onSelect={async () => {
                await logout()
              }}
              style={tw`p-3 border-t-gray-50 dark:border-t-gray-800 border-t`}
            >
              <Text
                style={tw`font-loaded-medium text-gray-900 dark:text-gray-50`}
              >
                {t('logout')}
              </Text>
            </MenuOption>
          </View>
        </MenuOptions>
      </Menu>
    </>
  )
}
