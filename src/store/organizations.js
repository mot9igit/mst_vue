import Axios from 'axios'

export default {
  state: {
    organizations: []
  },
  actions: {
    get_organizations_from_api ({ commit }) {
      return Axios('/rest/front_organizations', {
        method: 'POST'
      })
        .then((response) => {
          commit('SET_ORGANIZATIONS_TO_VUEX', response.data)
        })
    }
  },
  mutations: {
    SET_ORGANIZATIONS_TO_VUEX: (state, data) => {
      state.organizations = data.data
    }
  },
  getters: {
    organizations (state) {
      return state.organizations
    }
  }
}
