import Vue from 'vue'
import { getProducts, getProductById } from '../../api/product'

function createDefaultState() {
  return {
    error: null,
  }
}

const mutations = {
  SET_ERROR(state, error) {
    state.error = error
  },

  DESTROY(state) {
    Object.assign(state, createDefaultState())
  },
}

const actions = {
  async setError({ commit }, error) {
    commit('SET_ERROR', error)
  },

  async reset({ commit }) {
    commit('DESTROY')
  },
}

export const contextModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
}
