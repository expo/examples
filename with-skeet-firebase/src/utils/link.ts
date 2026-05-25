import { Linking } from 'react-native'
import i18n from '@/lib/i18n'
import Toast from 'react-native-toast-message'

export async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url)
  if (supported) {
    await Linking.openURL(url)
  } else {
    Toast.show({
      type: 'error',
      text1: i18n.t('linkError') ?? 'Link Error',
      text2: i18n.t('urlError') ?? 'Could not open the link',
    })
  }
}
