import Vuex from 'vuex'

import user from './user'
import products from './products'
import product from './product'
import organizations from './organizations'
import organization from './organization'
import dilers from './dilers'
import orders from './orders'
import order from './order'
import shipping from './shipping'

export default new Vuex.Store({
  modules: {
    user,
    products,
    product,
    organizations,
    organization,
    dilers,
    orders,
    order,
    shipping
  }
})
