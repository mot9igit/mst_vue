import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    products: []
  },
  actions: {
    get_data_from_api ({ commit }, { filter, filtersdata, page, sort, perpage }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage
      }
      return Axios('/rest/front_getproducts', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_DATA_TO_VUEX', response.data)
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
    SET_DATA_TO_VUEX: (state, data) => {
      state.products = data.data
    }
  },
  getters: {
    products (state) {
      return state.products
    }
  }
}
