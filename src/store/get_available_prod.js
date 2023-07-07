import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    products: []
  },
  actions: {
    get_available_products_from_api ({ commit }, { filter, selected }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        selected: selected
      }
      return Axios('/rest/front_getavproducts', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AV_PR_TO_VUEX', response.data)
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
    SET_AV_PR_TO_VUEX: (state, data) => {
      state.products = data.data
    }
  },
  getters: {
    available_products (state) {
      return state.products
    }
  }
}
