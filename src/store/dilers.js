import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    dilers: []
  },
  actions: {
    get_dilers_from_api ({ commit }, { type, filter, page, perpage }) {
      console.log(filter)
      return Axios('/rest/front_getdilers', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: type,
          filter: filter,
          page: page,
          perpage: perpage
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_DILERS_TO_VUEX', response.data)
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
    SET_DILERS_TO_VUEX: (state, data) => {
      state.dilers = data.data
    }
  },
  getters: {
    dilers (state) {
      return state.dilers
    }
  }
}
