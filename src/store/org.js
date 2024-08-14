import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    org_profile: []
  },
  actions: {
    org_profile_from_api ({ commit }, data) {
      return Axios('/rest/front_org', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_ORG_PROFILE_TO_VUEX', response.data)
          // console.log(response)
          return response
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    org_profile_set_from_api ({ commit }, data) {
      return Axios('/rest/front_org', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          // commit('SET_ORG_PROFILE_TO_VUEX', response.data)
          // console.log(response)
          return response
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
    SET_ORG_PROFILE_TO_VUEX: (state, data) => {
      state.org_profile = data.data
    }
  },
  getters: {
    org_profile (state) {
      return state.org_profile
    }
  }
}
