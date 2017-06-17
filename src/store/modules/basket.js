import Vue from 'vue'

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

export const basketModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
}
