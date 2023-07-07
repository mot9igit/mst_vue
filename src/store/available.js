import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    regions_data: []
  },
  actions: {
    get_dataavailable_from_api ({ commit }, { filter, filtersdata, page, sort, perpage }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage
      }
      console.log(data)
      return Axios('/rest/front_getavailable', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AVAILABLEDATA_TO_VUEX', response.data)
        })
    }
  },
  mutations: {
    SET_AVAILABLEDATA_TO_VUEX: (state, data) => {
      state.regions_data = data.data
    }
  },
  getters: {
    available (state) {
      return state.regions_data
    }
  }
}
