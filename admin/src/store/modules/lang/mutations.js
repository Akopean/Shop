import * as types from '../../mutation-types'
import Cookies from 'js-cookie'

// mutations
const mutations = {
  [types.SET_LANGUAGE]: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
}

export default mutations