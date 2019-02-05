import * as types from '../../mutation-types'
import products from '../../../api/auth/users'

// actions
const actions = {
    registerUser({commit}, data) {
        return products.http().create(data)
    },
};

export default actions
