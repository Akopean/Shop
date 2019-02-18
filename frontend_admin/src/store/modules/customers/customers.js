import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// initial state
const state = {
  errors: null,
  customer: null,
  all: [],
  total: 0,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}