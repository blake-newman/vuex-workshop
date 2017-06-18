import Vue from 'vue'
import {
  getBasket,
  purchaseBasket,
  addProductToBasket,
  updateProductInBasket,
  removeProductFromBasket,
} from '../../api/basket'

function createDefaultState() {
  return {}
}

const mutations = {
  ADD(state, payload) {
    payload.forEach(item => Vue.set(state, item.id, item))
  },

  REMOVE(state, payload) {
    payload.forEach(id => Vue.delete(state, id))
  },

  DESTROY(state) {
    state = createDefaultState()
  },
}

const actions = {
  async get({ commit, dispatch, rootState }) {
    const response = await getBasket()
    const { payload } = response.data
    const ids = payload.map(({ id }) => id)
    await Promise.all(ids.map(id => dispatch('product/getById', { id }, { root: true })))
    commit('ADD', payload)
    return response
  },

  async purchase({ commit }) {
    const response = await purchaseBasket()
    commit('DESTROY')
    return response
  },

  async addProduct({ commit }, { id }) {
    const response = await addProductToBasket(id)
    const { payload } = response.data
    commit('ADD', payload)
    return response
  },

  async updateQuantity({ commit }, { id, quantity }) {
    const response = await updateProductInBasket(id, quantity)
    const { payload } = response.data
    commit('ADD', payload)
    return response
  },

  async removeProduct({ commit, state }, { id }) {
    const response = await removeProductFromBasket(id)
    const { payload } = response.data
    const ids = payload.map(({ id }) => id)
    const missing = Object.keys(state).filter(id => !ids.includes(id))
    commit('REMOVE', missing)
    commit('ADD', payload)
    return response
  },
}

const getters = {
  list(state, _, { product }) {
    return Object.entries(state).map(([key, value]) => ({ ...value, ...product[key] }))
  },

  productTotal(state, _, { product }) {
    return id => {
      const { quantity } = state[id]
      const { price } = product[id]
      return price * quantity
    }
  },

  subtotal(_, { list }) {
    return list
      .map(({ basePrice, quantity }) => basePrice * quantity)
      .reduce((total, value) => total + value, 0)
  },

  total(_, { list }) {
    return list
      .map(({ price, quantity }) => price * quantity)
      .reduce((total, value) => total + value, 0)
  },

  discount(_, { subtotal, total }) {
    return subtotal - total
  },
}

export const basketModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters,
}
