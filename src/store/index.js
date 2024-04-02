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
import topsales from './topsales'
import available from './available'
import present from './present'
import regions from './regions'
import catalog from './catalog'
import vendors from './vendors'
import stores from './stores'
import warehouses from './warehouses'
import matrixs from './matrixs'
import matrix from './matrix'
import getAvailableProd from './get_available_prod'
import opt from './opt'

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
    shipping,
    topsales,
    available,
    present,
    regions,
    catalog,
    vendors,
    stores,
    warehouses,
    matrixs,
    matrix,
    getAvailableProd,
    opt
  }
})
