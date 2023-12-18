import instance from './instance'
import authModule from './auth'
import getProductsModule from './getProducts'
import getStoresModule from './getStores'
import getCheckCodeModule from './checkCode'

export default {
  auth: authModule(instance),
  getProducts: getProductsModule(instance),
  getStores: getStoresModule(instance),
  checkCode: getCheckCodeModule(instance)
}
