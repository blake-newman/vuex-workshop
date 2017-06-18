import Vue from 'vue'
import {
  getProducts,
  getProductById
} from '../../api/product'

function createState () {
  return {}
}

export default {
  namespaced: true,

  state: createState,

  mutations: {
    ADD (state, payload) {
      payload.forEach(item => Vue.set(state, item.id, item))
    }
  },

  actions: {
    async get ({ commit }) {
      const { data } = await getProducts()
      commit('ADD', data.payload)
    },

    async getById ({ commit }, { id }) {
      const { data } = await getProductById(id)
      commit('ADD', [data.payload])
    }
  },

  getters: {
    list (state) {
      return Object.keys(state).map(key => state[key])
    },

    stockedList (state, getters) {
      return getters.list.filter(({ stocked }) => stocked)
    },

    discountedList (state, getters) {
      return getters.list.filter(({ basePrice, price }) => basePrice > price)
    }
  }
}
