// import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

const store = new Vuex.Store({
  state: {
    products: []
  },
  actions: {
    get_data_from_api ({ commit }) {
      return Axios('http://localhost:8080/rest/front_getproducts', {
        method: 'POST'
      })
        .then((response) => {
          commit('set_data_to_vuex', response.data)
        })
    }
  },
  mutations: {
    set_data_to_vuex: (state, data) => {
      state.products = data.data
    }
  },
  getters: {
    products (state) {
      return state.products
    }
  }
})

export default store
