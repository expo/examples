import tw from '@/lib/tailwind'
import { Pressable } from 'react-native'
import { useAppColorScheme } from 'twrnc'
import { MoonIcon, SunIcon } from 'react-native-heroicons/outline'
import { useRecoilState } from 'recoil'
import { colorModeRefreshState } from '@/store/colorModeRefresh'

export default function ColorModeChanger() {
  const [_, __, setColorScheme] = useAppColorScheme(tw)
  const [_refresh, setRefresh] = useRecoilState(colorModeRefreshState)
  return (
    <>
      <Pressable
        onPress={() => {
          setColorScheme('light')
          setRefresh({ mode: 'light' })
        }}
        style={tw`hidden dark:flex hover:dark:text-gray-200`}
      >
        <SunIcon style={tw`h-5 w-5 dark:text-gray-50`} />
      </Pressable>
      <Pressable
        onPress={() => {
          setColorScheme('dark')
          setRefresh({ mode: 'dark' })
        }}
        style={tw`dark:hidden hover:text-gray-900`}
      >
        <MoonIcon style={tw`h-5 w-5 text-gray-700 `} />
      </Pressable>
    </>
  )
}
