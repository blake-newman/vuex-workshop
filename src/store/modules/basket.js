import Vue from 'vue'
import {
  getBasket,
  purchaseBasket,
  addProductToBasket,
  updateProductInBasket,
  removeProductFromBasket
} from '../../api/basket'

function createState () {
  return {}
}

export default {
  namespaced: true,

  state: createState,

  mutations: {
    ADD (state, payload) {
      payload.forEach(item => Vue.set(state, item.id, item))
    },

    REMOVE (state, payload) {
      payload.forEach(id => Vue.delete(state, id))
    },

    DESTROY (state) {
      state = createState()
    }
  },

  actions: {
    async get ({ commit, dispatch, rootState }) {
      const { data } = await getBasket()
      const ids = data.payload.map(({ id }) => id)
      await Promise.all(
        ids.map(id => dispatch('product/getById', { id }, { root: true }))
      )
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
      const missing = Object.keys(state)
        .filter(id => ids.indexOf(id) === -1)
      commit('REMOVE', missing)
      commit('ADD', data.payload)
    }
  }
}
