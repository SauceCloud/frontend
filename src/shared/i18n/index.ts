import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enAuth from './resources/en/auth.json'
import enCommon from './resources/en/common.json'
import enValidation from './resources/en/validation.json'
import ruAuth from './resources/ru/auth.json'
import ruCommon from './resources/ru/common.json'
import ruValidation from './resources/ru/validation.json'

export const defaultNS = 'common'

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('lang') ?? 'ru',
  fallbackLng: 'en',
  ns: ['common', 'auth', 'validation'],
  defaultNS,
  resources: {
    ru: { common: ruCommon, auth: ruAuth, validation: ruValidation },
    en: { common: enCommon, auth: enAuth, validation: enValidation },
  },
  interpolation: { escapeValue: false },
})

export { default } from 'i18next'
