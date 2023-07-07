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
          id: router.currentRoute._value.params.id
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_ORGANIZATION_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    delete_organization_from_api ({ commit }) {
      commit('DELETE_ORGANIZATION_FROM_VUEX')
    }
  },
  mutations: {
    SET_ORGANIZATION_TO_VUEX: (state, data) => {
      state.organization = data.data
    },
    DELETE_ORGANIZATION_FROM_VUEX: (state) => {
      state.organization = { }
    }
  },
  getters: {
    organization (state) {
      return state.organization
    }
  }
}
