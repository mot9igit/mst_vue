import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    mainpage: [],
    optcatalog: [],
    optvendors: [],
    optproducts: [],
    optbasket: []
  },
  actions: {
    set_vendors_to_api ({ commit }, data) {
      return Axios('/rest/front_setobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          // commit('SET_MATRIX_TO_VUEX', response.data)
          console.log(data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    opt_order_api ({ commit }, data) {
      return Axios('/rest/front_setobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          // commit('SET_MATRIX_TO_VUEX', response.data)
          console.log(response)
          return response
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_opt_mainpage_from_api ({ commit }) {
      return Axios('/rest/front_opt', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
          action: 'get/mainpage'
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_OPT_MAINPAGE_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_opt_catalog_from_api ({ commit }) {
      return Axios('/rest/front_opt', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
          action: 'get/catalog'
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_OPT_CATALOG_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_opt_vendors_from_api ({ commit }, sendData) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        action: 'get/vendors'
      }
      if (sendData) {
        if (Object.prototype.hasOwnProperty.call(sendData, 'filter')) {
          data.filter = sendData.filter
        }
      }
      return Axios('/rest/front_opt', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_OPT_VENDORS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_opt_products_from_api ({ commit }, { page, perpage }) {
      return Axios('/rest/front_opt', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
          category_id: router.currentRoute._value.params.category_id,
          page: page,
          perpage: perpage,
          action: 'get/products'
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_OPT_PRODUCTS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    busket_from_api ({ commit }, data) {
      return Axios('/rest/front_opt', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_BUSKET_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    }
  },
  mutations: {
    SET_OPT_MAINPAGE_TO_VUEX: (state, data) => {
      state.mainpage = data.data
    },
    SET_OPT_CATALOG_TO_VUEX: (state, data) => {
      state.optcatalog = data.data
    },
    SET_OPT_VENDORS_TO_VUEX: (state, data) => {
      state.optvendors = data.data
    },
    SET_OPT_PRODUCTS_TO_VUEX: (state, data) => {
      state.optproducts = data.data
    },
    SET_BUSKET_TO_VUEX: (state, data) => {
      state.optbasket = data.data
    }
  },
  getters: {
    mainpage (state) {
      return state.mainpage
    },
    optcatalog (state) {
      return state.optcatalog
    },
    optvendors (state) {
      return state.optvendors
    },
    optproducts (state) {
      return state.optproducts
    },
    optbasket (state) {
      return state.optbasket
    }
  }
}
