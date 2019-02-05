import * as types from '../../mutation-types'
import customers from '../../../api/shop/customers'

// actions
const actions = {
  fetchedCustomer ({commit}, id) {
    return customers.http().getOne(id)
      .then(resp => {
        commit(types.STORE_FETCHED_CUSTOMER, resp.data)
      })
      .catch(err => {
        commit(types.STORE_FETCHED_CUSTOMER_ERROR, err)
      })
  },
  createCustomer ({commit}, data) {
    return customers.http().create(data)
      .then(resp => {
        commit(types.CREATE_CUSTOMER)
      })
      .catch(err => {
        commit(types.CREATE_CUSTOMER_ERROR, err.response.data.errors)
      })
  },
  updateCustomer ({commit}, data) {
    return customers.http().update(data)
      .then(resp => {
        commit(types.UPDATE_CUSTOMER)
      })
      .catch(err => {
        commit(types.UPDATE_CUSTOMER_ERROR, err.response.data.errors)
      })
  },
  //List
  fetchedCustomers ({commit}, data) {
    return customers.http().getAll(data)
      .then(resp => {
        commit(types.STORE_FETCHED_CUSTOMERS, resp.data)
      })
      .catch(err => {
        commit(types.STORE_FETCHED_CUSTOMERS_ERROR, err)
      })
  },
  searchCustomers ({commit}, data) {
    return customers.http().searchAll(data)
      .then(resp => {
        commit(types.SEARCH_CUSTOMERS, resp.data)
      })
      .catch(err => {
        commit(types.SEARCH_CUSTOMERS_ERROR, err)
      })
  },
  orderCustomers ({commit}, data) {
    return customers.http().orderAll({data: data})
      .then(resp => {
        commit(types.ORDER_CUSTOMERS, resp.data)
      })
      .catch(err => {
        commit(types.ORDER_CUSTOMERS_ERROR, err)
      })
  },
  deleteCustomer({commit}, id) {
    return customers.http().delete(id)
      .then(resp => {
        commit(types.DELETE_CUSTOMER, id)
      })
      .catch(err => {
        commit(types.DELETE_CUSTOMER_ERROR, err)
      })
  },
}

export default actions
