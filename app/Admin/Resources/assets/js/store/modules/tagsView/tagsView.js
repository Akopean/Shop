import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// initial state
const state = {
    visitedViews: [],
    cachedViews: []
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
