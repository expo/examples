import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'

const NavigationLayout = () => {
  const { isSignedIn = false } = useAuth()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(home)/index" />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <NavigationLayout/>
    </ClerkProvider>
  )
}