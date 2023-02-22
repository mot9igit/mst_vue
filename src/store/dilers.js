import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    dilers: []
  },
  actions: {
    get_dilers_from_api ({ commit }, { filter, page, perpage }) {
      console.log(filter)
      return Axios('/rest/front_getdilers', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
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
