import Vue from 'vue'
import { getProducts, getProductById } from '../../api/product'

function createDefaultState() {
  return {}
}

const mutations = {
  ADD(state, payload) {
    payload.forEach(item => Vue.set(state, item.id, item))
  },
}

const actions = {
  async get({ commit }) {
    const response = await getProducts()
    const { payload } = response.data
    commit('ADD', payload)
    return response
  },

  async getById({ commit }, { id }) {
    const response = await getProductById(id)
    const { payload } = response.data
    commit('ADD', [payload])
    return response
  },
}

export const productModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
}
