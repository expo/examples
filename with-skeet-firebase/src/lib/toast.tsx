import { BaseToastProps } from 'react-native-toast-message'
import { BaseToast } from 'react-native-toast-message'
import tw from '@/lib/tailwind'

export const toastConfig = {
  primary: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={tw`border-l-gray-900 dark:border-l-gray-50 bg-white dark:bg-gray-900`}
      text1Style={tw`font-loaded-bold text-lg pt-1 text-gray-900 dark:text-gray-50`}
      text2Style={tw`font-loaded-normal text-sm pb-1 text-gray-500 dark:text-gray-200`}
    />
  ),
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={tw`border-l-green-500 dark:border-l-green-300 bg-white dark:bg-gray-900`}
      text1Style={tw`font-loaded-bold text-lg pt-1 text-gray-900 dark:text-gray-50`}
      text2Style={tw`font-loaded-normal text-sm pb-1 text-gray-500 dark:text-gray-200`}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={tw`border-l-red-500 dark:border-l-red-300 bg-white dark:bg-gray-900`}
      text1Style={tw`font-loaded-bold text-lg pt-1 text-gray-900 dark:text-gray-50`}
      text2Style={tw`font-loaded-normal text-sm pb-1 text-gray-500 dark:text-gray-200`}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={tw`border-l-blue-500 dark:border-l-blue-300 bg-white dark:bg-gray-900`}
      text1Style={tw`font-loaded-bold text-lg pt-1 text-gray-900 dark:text-gray-50`}
      text2Style={tw`font-loaded-normal text-sm pb-1 text-gray-500 dark:text-gray-200`}
    />
  ),
  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={tw`border-l-yellow-500 dark:border-l-yellow-300 bg-white dark:bg-gray-900`}
      text1Style={tw`font-loaded-bold text-lg pt-1 text-gray-900 dark:text-gray-50`}
      text2Style={tw`font-loaded-normal text-sm pb-1 text-gray-500 dark:text-gray-200`}
    />
  ),
}
