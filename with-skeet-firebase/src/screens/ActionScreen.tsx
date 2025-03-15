import { Suspense, useMemo } from 'react'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import useAnalytics from '@/hooks/useAnalytics'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/routes/Routes'
import InvalidParamsError from '@/components/error/InvalidParamsError'
import ResetPasswordAction from '@/components/screens/default/action/ResetPasswordAction'
import VerifyEmailAction from '@/components/screens/default/action/VerifyEmailAction'
import useColorModeRefresh from '@/hooks/useColorModeRefresh'

type ActionScreenRouteProp = RouteProp<RootStackParamList, 'Action'>

export default function ActionScreen() {
  useColorModeRefresh()
  useAnalytics()
  const route: ActionScreenRouteProp = useRoute()
  const mode = useMemo(() => route.params?.mode ?? undefined, [route.params])
  const oobCode = useMemo(
    () => route.params?.oobCode ?? undefined,
    [route.params]
  )

  if (!mode || !oobCode) {
    return (
      <>
        <DefaultLayout>
          <InvalidParamsError />
        </DefaultLayout>
      </>
    )
  }

  if (mode !== 'resetPassword' && mode !== 'verifyEmail') {
    return (
      <>
        <DefaultLayout>
          <InvalidParamsError />
        </DefaultLayout>
      </>
    )
  }

  return (
    <>
      {mode === 'resetPassword' && (
        <Suspense fallback="AppLoading">
          <DefaultLayout>
            <ResetPasswordAction oobCode={oobCode} />
          </DefaultLayout>
        </Suspense>
      )}
      {mode === 'verifyEmail' && (
        <Suspense fallback="AppLoading">
          <DefaultLayout>
            <VerifyEmailAction oobCode={oobCode} />
          </DefaultLayout>
        </Suspense>
      )}
    </>
  )
}
