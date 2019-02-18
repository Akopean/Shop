import * as types from '../../mutation-types'

// mutations
const mutations = {
    [types.TOGGLE_SIDEBAR](state) {
        state.sidebarStatus = !state.sidebarStatus
    },
};

export default mutations
