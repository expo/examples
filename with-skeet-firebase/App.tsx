import 'react-native-gesture-handler'
import '@/lib/i18n'
import { useDeviceContext } from 'twrnc'
import tw from '@/lib/tailwind'
import { useFonts } from 'expo-font'
import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit'

import AppLoading from '@/components/loading/AppLoading'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { MenuProvider } from 'react-native-popup-menu'
import Toast from 'react-native-toast-message'
import { toastConfig } from '@/lib/toast'
import Routes from '@/routes/Routes'

export default function App() {
  useDeviceContext(tw)

  const [fontsLoaded] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <>
        <AppLoading />
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <RecoilRoot>
          <SkeetApp />
        </RecoilRoot>
      </Suspense>
    </>
  )
}

function SkeetApp() {
  return (
    <>
      <MenuProvider>
        <Routes />
        <Toast config={toastConfig} />
      </MenuProvider>
    </>
  )
}
