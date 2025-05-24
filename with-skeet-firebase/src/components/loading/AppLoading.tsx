import tw, { colors } from '@/lib/tailwind'
import { View, ActivityIndicator } from 'react-native'

export default function AppLoading() {
  return (
    <>
      <View
        style={tw`flex h-full w-full pb-16 items-center justify-center bg-white dark:bg-gray-900`}
      >
        <ActivityIndicator color={colors.blue[400]} />
      </View>
    </>
  )
}
