import tw from '@/lib/tailwind'
import { View } from 'react-native'

export default function ChatMenuLoading() {
  return (
    <>
      <View
        style={tw`w-full h-full flex-col items-center justify-center gap-3 py-3`}
      >
        <View style={tw`w-full h-12 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`w-full h-12 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`w-full h-12 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`w-full h-12 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`w-full h-12 bg-gray-50 dark:bg-gray-800`} />
      </View>
    </>
  )
}
