import Axios from 'axios'
import router from '@/router'

export default {
  state: {
    akbdata: [],
    matrix: [],
    brands: [],
    available_brands: [],
    reports: [],
    report: [],
    bonuses: [],
    bonus: [],
    stores: [],
    akbpunkts: [],
    akbdotsplan: [],
    akbpunktsplan: [],
    akbsettlements: []
  },
  actions: {
    get_available_stores_from_api ({ commit }, { filter, selected }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        selected: selected,
        type: 'available_stores'
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AV_ST_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_bonuses_from_api ({ commit }, { filter, filtersdata, page, sort, perpage }) {
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          type: 'bonuses',
          filter: filter,
          filtersdata: filtersdata,
          sort: sort,
          page: page,
          perpage: perpage
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_BONUSES_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_matrixes_from_api ({ commit }) {
      return Axios('/rest/front_gettree', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          get_type: 'matrix'
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_MATRIXES_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_brands_from_api ({ commit }) {
      return Axios('/rest/front_gettree', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          get_type: 'brands'
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_BRANDS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_available_brands_from_api ({ commit }, { type }) {
      return Axios('/rest/front_gettree', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          get_type: 'brands',
          type: type,
          available: 1
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AVAILABLE_BRANDS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_reports_from_api ({ commit }, { filter, filtersdata, page, sort, perpage }) {
      return Axios('/rest/front_getreports', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          filter: filter,
          filtersdata: filtersdata,
          sort: sort,
          page: page,
          perpage: perpage
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_REPORTS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    set_report_to_api ({ commit }, data) {
      return Axios('/rest/front_getreports', {
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
    get_bonus_from_api ({ commit }, { id }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'bonus',
        bonus_id: id
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_BONUS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_akb_data ({ commit }) {
      // console.log(filter)
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'akbdata'
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AKB_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_akbpunkts_from_api ({ commit }, { sort, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'akbpunkts',
        sort: sort,
        page: page,
        perpage: perpage
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AKBPUNKTS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_akbsettlements_from_api ({ commit }, { sort, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'akbsettlements',
        sort: sort,
        page: page,
        perpage: perpage
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AKBSETTLEMENTS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_akbdotsplan_from_api ({ commit }, { sort, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'akbdotsplan',
        sort: sort,
        page: page,
        perpage: perpage
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AKBDOTSPLAN_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_akbpunktsplan_from_api ({ commit }, { sort, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'akbpunktsplan',
        sort: sort,
        page: page,
        perpage: perpage
      }
      return Axios('/rest/front_getobjects', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_AKBPUNKTSPLAN_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    set_organization_data ({ commit }, data) {
      return Axios('/rest/front_setobjects', {
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
    set_bonus_to_api ({ commit }, data) {
      return Axios('/rest/front_setobjects', {
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
    set_connection_to_api ({ commit }, data) {
      return Axios('/rest/front_setobjects', {
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
    set_object_to_api ({ commit }, data) {
      return Axios('/rest/front_setobjects', {
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
    get_report_from_api ({ commit }) {
      return Axios('/rest/front_getreports', {
        method: 'POST',
        data: {
          id: router.currentRoute._value.params.id,
          report_id: router.currentRoute._value.params.report_id
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_REPORT_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    get_report_data_from_api ({ commit }, { filter, filtersdata, page, sort, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        report_id: router.currentRoute._value.params.report_id,
        report_data: 1,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage
      }
      if (router.currentRoute._value.params.elem_id) {
        data.elem_id = router.currentRoute._value.params.elem_id
      }
      return Axios('/rest/front_getreports', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          commit('SET_REPORTS_TO_VUEX', response.data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'home' })
          }
        })
    },
    unset_reports_data ({ commit }) {
      commit('UNSET_REPORTS_TO_VUEX')
    },
    unset_akbdotsplan_data ({ commit }) {
      commit('UNSET_AKBDOTSPLAN_VUEX')
    },
    unset_akbpunkts_data ({ commit }) {
      commit('UNSET_AKBPUNKTS')
    },
    unset_akbdots_data ({ commit }) {
      commit('UNSET_AKBDOTS')
    },
    unset_akbpunktsplan_data ({ commit }) {
      commit('UNSET_AKBPUNKTSPLAN')
    },
    unset_bonuses_data ({ commit }) {
      commit('UNSET_BONUSES_VUEX')
    },
    unset_akbsettlements_data ({ commit }) {
      commit('UNSET_AKBSETTLEMENTS')
    }
  },
  mutations: {
    SET_MATRIXES_TO_VUEX: (state, data) => {
      state.matrix = data.data
    },
    SET_BRANDS_TO_VUEX: (state, data) => {
      state.brands = data.data
    },
    SET_AVAILABLE_BRANDS_TO_VUEX: (state, data) => {
      state.available_brands = data.data
    },
    SET_REPORTS_TO_VUEX: (state, data) => {
      state.reports = data.data
    },
    SET_REPORT_TO_VUEX: (state, data) => {
      state.report = data.data
    },
    SET_AKBDOTSPLAN_TO_VUEX: (state, data) => {
      state.akbdotsplan = data.data
    },
    SET_AKBPUNKTSPLAN_TO_VUEX: (state, data) => {
      state.akbpunktsplan = data.data
    },
    SET_BONUS_TO_VUEX: (state, data) => {
      if (data.data.date_from && data.data.date_to) {
        data.data.dates = [
          new Date(data.data.date_from),
          new Date(data.data.date_to)
        ]
      }
      state.bonus = data.data
    },
    UNSET_REPORTS_TO_VUEX: (state) => {
      state.reports = []
    },
    SET_AKB_TO_VUEX: (state, data) => {
      state.akbdata = data.data
    },
    SET_AKBPUNKTS_TO_VUEX: (state, data) => {
      state.akbpunkts = data.data
    },
    SET_BONUSES_TO_VUEX: (state, data) => {
      state.bonuses = data.data
    },
    UNSET_AKBDOTSPLAN_VUEX: (state) => {
      state.akbdotsplan = []
    },
    UNSET_AKBPUNKTSPLAN: (state) => {
      state.akbpunktsplan = []
    },
    UNSET_BONUSES_VUEX: (state) => {
      state.bonuses = []
    },
    UNSET_AKBPUNKTS: (state) => {
      state.akbpunkts = []
    },
    UNSET_AKBDOTS_VUEX: (state) => {
      state.akbdots = []
    },
    SET_AV_ST_TO_VUEX: (state, data) => {
      state.stores = data.data
    },
    SET_AKBSETTLEMENTS_TO_VUEX: (state, data) => {
      state.akbsettlements = data.data
    },
    UNSET_AKBSETTLEMENTS: (state) => {
      state.akbsettlements = []
    }
  },
  getters: {
    getakbdata (state) {
      return state.akbdata
    },
    getmatrixes (state) {
      return state.matrix
    },
    getbrands (state) {
      return state.brands
    },
    available_brands (state) {
      return state.available_brands
    },
    getreports (state) {
      return state.reports
    },
    getreport (state) {
      return state.report
    },
    bonus (state) {
      return state.bonus
    },
    getbonuses (state) {
      return state.bonuses
    },
    available_stores (state) {
      return state.stores
    },
    getakbpunkts (state) {
      return state.akbpunkts
    },
    getakbsettlements (state) {
      return state.akbsettlements
    },
    getakbdotsplan (state) {
      return state.akbdotsplan
    },
    getakbpunktsplan (state) {
      return state.akbpunktsplan
    }
  }
}
