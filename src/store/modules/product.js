import {
  getProducts,
  getProductById
} from '../../api/product'

function createState () {
  return {
    data: {}
  }
}

export default {
  namespaced: true,

  state: createState,

  mutations: {
    ADD (state, payload) {
      const data = {}
      payload
        .filter(item => !state.data[item.id])
        .forEach(item => (data[item.id] = item))
      state.data = Object.assign({}, state.data, data)
    }
  },

  actions: {
    async get ({ commit }) {
      const { data } = await getProducts()
      commit('ADD', data.payload)
    },

    async getByIds ({ commit, state }, { ids }) {
      const getIds = ids.filter(id => !state.data[id])
      if (!getIds.length) return
      const response = await Promise.all(getIds.map(getProductById))
      const data = response.map(({ data }) => data.payload)
      commit('ADD', data)
    }
  },

  getters: {
    list (state) {
      return Object.keys(state.data).map(key => state.data[key])
    },

    stockedList (state, getters) {
      return getters.list.filter(({ stocked }) => stocked)
    },

    discountedList (state, getters) {
      return getters.list.filter(({ basePrice, price }) => basePrice > price)
    }
  }
}
