import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import enLocale from './en'
import ruLocale from './ru'
import Vue from 'vue'

// https://kazupon.github.io/vue-i18n/installation.html#compatibility-note
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
  },
  ru: {
    ...ruLocale,
  },
}

const i18n = new VueI18n({
  // set locale
  // options: en | ru
  locale: Cookies.get('language') || 'en',
  // set locale messages
  messages,
  silentTranslationWarn: process.env.NODE_ENV === 'production'
})

export default i18n