import tw from '@/lib/tailwind'
import { View } from 'react-native'

export default function ActionLoading() {
  return (
    <>
      <View style={tw`w-full h-full flex-col items-center justify-center`}>
        <View style={tw`w-32 h-32 rounded-full bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`mt-8 w-64 h-8 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`mt-6 w-80 h-6 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`mt-2 w-80 h-6 bg-gray-50 dark:bg-gray-800`} />
        <View style={tw`mt-2 w-80 h-6 bg-gray-50 dark:bg-gray-800`} />
      </View>
    </>
  )
}
