import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// initial state
const state = {
    sidebarStatus: true,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
