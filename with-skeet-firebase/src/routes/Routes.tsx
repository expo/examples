import { defaultUser, userState } from '@/store/user'
import { useRecoilState } from 'recoil'
import { useMemo, useEffect, useState, useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserRoutes from './UserRoutes'
import DefaultRoutes from './DefaultRoutes'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from '@/components/loading/AppLoading'
import { useTranslation } from 'react-i18next'
import * as Linking from 'expo-linking'
import skeetCloudConfig from '@root/skeet-cloud.config.json'
import useScreens from '@/hooks/useScreens'
import { auth, db } from '@/lib/firebase'
import { signOut, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const Stack = createNativeStackNavigator()
const prefix = Linking.createURL('/')

export type RootStackParamList = {
  Action: {
    mode?: string | undefined
    oobCode?: string | undefined
  }
}

export default function Routes() {
  const { t } = useTranslation()
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useRecoilState(userState)

  const onAuthStateChanged = useCallback(
    async (user: User | null) => {
      if (initializing) setInitializing(false)
      if (auth && db && user) {
        if (!user?.emailVerified) {
          await signOut(auth)
          setUser(defaultUser)
        }
        const docRef = doc(db, 'User', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUser({
            uid: user.uid,
            email: user.email ?? '',
            username: docSnap.data().username,
            iconUrl: docSnap.data().iconUrl,
            emailVerified: user.emailVerified,
          })
        } else {
          await signOut(auth)
          setUser(defaultUser)
        }
      } else {
        setUser(defaultUser)
      }
    },
    [setUser, initializing, setInitializing]
  )

  useEffect(() => {
    let subscriber = () => {}

    if (auth) {
      subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    }
    return () => subscriber()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { defaultScreens, userScreens } = useScreens()

  const linking = useMemo(() => {
    return {
      prefixes: [prefix, `https://${skeetCloudConfig.app.appDomain}/`],
      config: {
        screens: {
          Default: {
            path: '',
            screens: defaultScreens,
          },
          User: {
            path: 'user',
            screens: userScreens,
          },
        },
      },
    }
  }, [defaultScreens, userScreens])

  return (
    <>
      <NavigationContainer
        documentTitle={{
          formatter: (_options, route) =>
            `${t(`routes.${route?.name}`)} - ${t('appTitle')}`,
        }}
        fallback={<AppLoading />}
        linking={linking}
      >
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={
            auth?.currentUser?.emailVerified && user.emailVerified
              ? 'User'
              : 'Default'
          }
        >
          {auth?.currentUser?.emailVerified && user.emailVerified ? (
            <Stack.Screen name="User" component={UserRoutes} />
          ) : (
            <Stack.Screen name="Default" component={DefaultRoutes} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
