import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from '@/locales/en-US/translation'
import translationJA from '@/locales/ja-JP/translation'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    'en-US': { ...translationEN },
    'ja-JP': { ...translationJA },
  },
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
