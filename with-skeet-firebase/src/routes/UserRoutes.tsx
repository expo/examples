import UserOpenAiChatScreen from '@/screens/user/UserOpenAiChatScreen'
import UserSettingsScreen from '@/screens/user/UserSettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ChatBubbleLeftRightIcon,
  Cog8ToothIcon,
} from 'react-native-heroicons/outline'

export const userRoutes = [
  {
    name: 'OpenAiChat',
    component: UserOpenAiChatScreen,
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Settings',
    component: UserSettingsScreen,
    icon: Cog8ToothIcon,
  },
]

const Stack = createNativeStackNavigator()

export default function UserRoutes() {
  return (
    <>
      <Stack.Navigator
        initialRouteName={userRoutes[0].name}
        screenOptions={{ headerShown: false }}
      >
        {userRoutes.map((route) => (
          <Stack.Screen
            key={`UserRoutes ${route.name}`}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </>
  )
}
