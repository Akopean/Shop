import * as types from '../../mutation-types'
import products from '../../../api/shop/products'

// actions
const actions = {
  fetchedProduct ({commit}, slug) {
    return products.http().getOne(slug)
      .then(resp => {
        commit(types.STORE_FETCHED_PRODUCT, resp.data)
      })
      .catch(err => {
        commit(types.STORE_FETCHED_PRODUCT_ERROR, err)
      })
  },
  createProduct ({commit}, data) {
    return products.http().create(data)
      .then(resp => {
        commit(types.CREATE_PRODUCT)
      })
      .catch(err => {
        commit(types.CREATE_PRODUCT_ERROR, err.response.data.errors)
      })
  },
  updateProduct ({commit}, data) {
    return products.http().update(data)
      .then(resp => {
        commit(types.UPDATE_PRODUCT)
      })
      .catch(err => {
        commit(types.UPDATE_PRODUCT_ERROR, err.response.data.errors)
      })
  },
  //List
  fetchedProducts ({commit}, data) {
    return products.http().getAll(data)
      .then(resp => {
        commit(types.STORE_FETCHED_PRODUCTS, resp.data)
      })
      .catch(err => {
        commit(types.STORE_FETCHED_PRODUCTS_ERROR, err)
      })
  },
  searchProducts ({commit}, data) {
    return products.http().searchAll(data)
      .then(resp => {
        commit(types.SEARCH_PRODUCTS, resp.data)
      })
      .catch(err => {
        commit(types.SEARCH_PRODUCTS_ERROR, err)
      })
  },
  deleteProduct ({commit}, slug) {
    return products.http().delete(slug)
      .then(resp => {
        commit(types.DELETE_PRODUCT, slug)
      })
      .catch(err => {
        commit(types.DELETE_PRODUCT_ERROR, err)
      })
  }
}

export default actions
