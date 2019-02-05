import * as types from '../../mutation-types'

// mutations
const mutations = {
    [types.TOGGLE_SIDEBAR] (state) {
    state.sidebarOpen = !state.sidebarOpen
},
}

export default mutations
