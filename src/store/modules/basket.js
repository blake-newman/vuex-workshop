import Vue from 'vue'
import {
  getBasket,
  purchaseBasket,
  addProductToBasket,
  updateProductInBasket,
  removeProductFromBasket
} from '../../api/basket'

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
      payload.forEach(item => (data[item.id] = item))
      state.data = Object.assign({}, state.data, data)
    },

    REMOVE (state, payload) {
      payload.forEach(id => Vue.delete(state.data, id))
    },

    DESTROY (state) {
      state = createState()
    }
  },

  actions: {
    async get ({ commit, dispatch, rootState }) {
      const { data } = await getBasket()
      const ids = data.payload.map(({ id }) => id)
      await dispatch('product/getByIds', { ids }, { root: true })
      commit('ADD', data.payload)
    },

    async purchase ({ commit }) {
      await purchaseBasket()
      commit('DESTROY')
    },

    async addProduct ({ commit }, { id }) {
      const { data } = await addProductToBasket(id)
      commit('ADD', data.payload)
    },

    async updateProduct ({ commit }, { id, quantity }) {
      const { data } = await updateProductInBasket(id, quantity)
      commit('ADD', data.payload)
    },

    async removeProduct ({ commit, state }, { id }) {
      const { data } = await removeProductFromBasket(id)
      const ids = data.payload.map(({ id }) => id)
      const missing = Object.keys(state.data)
        .filter(id => ids.indexOf(id) === -1)
      commit('REMOVE', missing)
      commit('ADD', data.payload)
    }
  },

  getters: {
    list (state, getters, rootState) {
      return Object.keys(state.data)
        .map(key => Object.assign({}, state.data[key], rootState.product.data[key]))
    },

    productTotal (state, getters, rootState) {
      return id => {
        const { quantity } = state.data[id]
        const { price } = rootState.product.data[id]
        return price * quantity
      }
    },

    subtotal (state, getters) {
      return getters.list
        .map(({ basePrice, quantity }) => basePrice * quantity)
        .reduce((total, value) => total + value, 0)
    },

    total (state, getters) {
      return getters.list
        .map(({ price, quantity }) => price * quantity)
        .reduce((total, value) => total + value, 0)
    },

    discount (state, getters) {
      return getters.subtotal - getters.total
    }
  }
}
