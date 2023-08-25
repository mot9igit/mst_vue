import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    shipping: []
  },
  actions: {
    get_shipping_from_api ({ commit }, { filter, filtersdata, page, sort, perpage }) {
      return Axios('/rest/front_getshipping', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          filter: filter,
          filtersdata: filtersdata,
          sort: sort,
          page: page,
          perpage: perpage
        }
      })
        .then((response) => {
          commit('SET_SHIPPING_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    async set_shipping_to_api ({ commit }, data) {
      return Axios('/rest/front_getshipping', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_SHIPPING_TO_VUEX', response.data)
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
    SET_SHIPPING_TO_VUEX: (state, data) => {
      if (typeof data.data.dates !== 'undefined' && data.data.dates.dates !== null) {
        if (typeof data.data.dates.dates !== 'undefined' && data.data.dates.dates !== null) {
          const highlight = data.data.dates
          for (let i = 0; i < highlight.dates.length; i++) {
            const tmp = data.data.dates.dates[i]
            data.data.dates.dates[i] = new Date(tmp)
          }
        }
      }
      state.shipping = data.data
    }
  },
  getters: {
    shipping (state) {
      return state.shipping
    }
  }
}
