import { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { logEvent } from 'firebase/analytics'
import { useTranslation } from 'react-i18next'
import { analytics } from '@/lib/firebase'

export default function useAnalytics() {
  const { t } = useTranslation()

  const route = useRoute()

  useEffect(() => {
    if (analytics && route.name) {
      logEvent(analytics, 'page_view', {
        page_title: t(`routes.${route.name}`) ?? route.name,
        page_location: route.name,
        page_path: `/${route.name}`,
      })
    }
  }, [route.name, t])
}
