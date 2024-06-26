import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    actions: [],
    allactions: [],
    salesbanners: []
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
    },
    get_sales_to_api ({ commit }, { filter, filtersdata, page, sort, perpage, actionid, type }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage,
        action: 'get',
        action_id: actionid,
        type: type
      }
      return Axios('/rest/front_sales', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('GET_ACTIONS_TO_VUEX', response.data)
        })
    },
    get_all_sales_to_api ({ commit }, data) {
      return Axios('/rest/front_sales', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('GET_ALL_ACTION_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_salses_banners_to_api ({ commit }, data) {
      return Axios('/rest/front_sales', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('GET_BANNERS_SALES_TO_VUEX', response.data)
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
    GET_ACTIONS_TO_VUEX: (state, data) => {
      state.actions = data.data
    },
    GET_ALL_ACTION_TO_VUEX: (state, data) => {
      state.allactions = data.data
    },
    GET_BANNERS_SALES_TO_VUEX: (state, data) => {
      state.salesbanners = data.data
    }
  },
  getters: {
    actions (state) {
      return state.actions
    },
    allactions (state) {
      return state.allactions
    },
    salesbanners (state) {
      return state.salesbanners
    }
  }
}
