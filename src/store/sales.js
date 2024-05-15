import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    sales: []
  },
  actions: {
    set_sales_to_api ({ commit }, data) {
      return Axios('/rest/front_sales', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          // commit('SET_MATRIX_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    }
  }
//   mutations: {
//     SET_ALL_ORGANIZATIONS_TO_VUEX: (state, data) => {
//       state.allorganizations = data.data
//     }
//   },
//   getters: {
//     allorganizations (state) {
//       return state.allorganizations
//     }
//   }
}
