import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    products: []
  },
  actions: {
    get_data_from_api ({ commit }, { filter, filtersdata, page, perpage }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        filter: filter,
        filtersdata: filtersdata,
        page: page,
        perpage: perpage
      }
      console.log(data)
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
