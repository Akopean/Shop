import * as types from '../../mutation-types';

// mutations
const mutations = {
    [types.STORE_FETCHED_PRODUCT](state, data) {
        state.product = data;
    },
    [types.STORE_FETCHED_PRODUCT_ERROR](state, err) {
        state.product = [];
        flash(err.message, 'danger');
    },
    [types.CREATE_PRODUCT](state) {
        flash('New User is create', 'success');
        state.errors = false;
    },
    [types.CREATE_PRODUCT_ERROR](state) {
        state.errors = true;
    },
    [types.UPDATE_PRODUCT](state) {
        flash('User data is updated', 'success');
        state.errors = false;
    },
    [types.UPDATE_PRODUCT_ERROR](state) {
        state.errors = true;
    },
    // List
    [types.STORE_FETCHED_PRODUCTS]: (state, data) => {
        state.all = data.data;
        state.total = data.meta.total;
    },
    [types.STORE_FETCHED_PRODUCTS_ERROR](state, err) {
        state.all = [];
        flash(err.message, 'danger');
    },
    [types.SEARCH_PRODUCTS]: (state, data) => {
        state.all = data.data;
        state.total = data.meta.total;
        console.log(state.total);
    },
    [types.SEARCH_PRODUCTS_ERROR](state, err) {
        state.all = [];
        state.total = 0;
        flash(err.message, 'danger');
    },
    [types.DELETE_PRODUCT](state, id) {
        state.all.splice(_.findIndex(state.all, item => item.id === id), 1);
    },
    [types.DELETE_PRODUCT_ERROR](state, err) {
        state.errors = true;
        flash(err.message, 'danger');
    },
};

export default mutations;
