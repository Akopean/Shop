import * as types from '../../mutation-types';

// mutations
const mutations = {
    [types.AUTH_USER](state) {
        state.login = true;
    },
    [types.AUTH_USER_ERROR](state) {
        state.login = false;
    },
    [types.LOGOUT_USER](state) {
        state.login = false;
    },
};

export default mutations;
