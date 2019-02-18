import * as types from '../../mutation-types'

// actions
const actions = {
  setLanguage({commit}, language) {
    commit(types.SET_LANGUAGE, language)
  },
}

export default actions