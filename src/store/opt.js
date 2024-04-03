import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    mainpage: [],
    optcatalog: [],
    optvendors: []
  },
  actions: {
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
    get_opt_vendors_from_api ({ commit }) {
      return Axios('/rest/front_opt', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
          action: 'get/vendors'
        },
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
    }
  }
}
