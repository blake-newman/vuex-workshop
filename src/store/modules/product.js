import Vue from 'vue'

function createDefaultState() {
  return {}
}

const mutations = {
  ADD(state, payload) {
    payload.forEach(item => Vue.set(state, item.id, item))
  },
}

export const productModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
}
