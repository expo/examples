import ActionScreen from '@/screens/ActionScreen'
import LoginScreen from '@/screens/LoginScreen'
import RegisterScreen from '@/screens/RegisterScreen'
import ResetPasswordScreen from '@/screens/ResetPasswordScreen'
import CheckEmailScreen from '@/screens/CheckEmailScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export const defaultRoutes = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  },
  {
    name: 'CheckEmail',
    component: CheckEmailScreen,
  },
  {
    name: 'Action',
    component: ActionScreen,
  },
]

const Stack = createNativeStackNavigator()

export default function DefaultRoutes() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {defaultRoutes.map((route) => (
          <Stack.Screen
            key={`DefaultRoutes ${route.name}`}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </>
  )
}
