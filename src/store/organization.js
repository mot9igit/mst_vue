import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    organization: []
  },
  actions: {
    get_organization_from_api ({ commit }) {
      return Axios('/rest/front_organization', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_ORGANIZATION_TO_VUEX', response.data)
        })
    }
  },
  mutations: {
    SET_ORGANIZATION_TO_VUEX: (state, data) => {
      state.organization = data.data
    }
  },
  getters: {
    organization (state) {
      return state.organization
    }
  }
}
