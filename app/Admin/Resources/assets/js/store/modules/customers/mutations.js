import * as types from '../../mutation-types'

// mutations
const mutations = {
  [types.STORE_FETCHED_CUSTOMER] (state, data) {

    state.customer = data.attributes
  },
  [types.STORE_FETCHED_CUSTOMER_ERROR] (state, err) {
    state.customer = []
    flash(err.message, 'danger')
  },
  [types.CREATE_CUSTOMER] (state) {
    flash('New CUSTOMER is create', 'success')
    state.errors = false
  },
  [types.CREATE_CUSTOMER_ERROR] (state) {
    state.errors = true
  },
  [types.UPDATE_CUSTOMER] (state) {
    flash('CUSTOMER data is updated', 'success')
    state.errors = false
  },
  [types.UPDATE_CUSTOMER_ERROR] (state) {
    state.errors = true
  },
  // List
  [types.STORE_FETCHED_CUSTOMERS]: (state, data) => {
    state.all = data.data
    state.total = data.meta.total
  },
  [types.STORE_FETCHED_CUSTOMERS_ERROR] (state, err) {
    state.all = []
    flash(err.message, 'danger')
  },
  [types.SEARCH_CUSTOMERS]: (state, data) => {
    state.all = data.data
    state.total = data.meta.total
    console.log(state.total)
  },
  [types.SEARCH_CUSTOMERS_ERROR] (state, err) {
    state.all = []
    state.total = 0
    flash(err.message, 'danger')
  },
  [types.ORDER_CUSTOMERS]: (state, data) => {
    state.all = data.data
    state.total = data.meta.total
  },
  [types.ORDER_CUSTOMERS_ERROR] (state, err) {
    state.all = []
    state.total = 0
    flash(err.message, 'danger')
  },
  [types.DELETE_CUSTOMER] (state, id) {
    state.all.splice(_.findIndex(state.all, item => item.id === id), 1)
  },
  [types.DELETE_CUSTOMER_ERROR] (state, err) {
    state.errors = true
    flash(err.message, 'danger')
  },
}

export default mutations