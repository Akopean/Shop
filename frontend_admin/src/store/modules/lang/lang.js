import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import Cookies from 'js-cookie'

// initial state
const state = {
  language: Cookies.get('language') || 'en',
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}