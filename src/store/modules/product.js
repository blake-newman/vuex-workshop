import { getProducts, getProductById } from '../../api/product'

function createDefaultState() {
  return {}
}

const mutations = {
  ADD(state, payload) {
    const data = {}
    payload.forEach(item => (data[item.id] = item))
    Object.assign(state, data)
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

const getters = {
  list(state) {
    return Object.values(state)
  },

  listStocked(_, { list }) {
    return list.filter(({ stocked }) => stocked)
  },

  listDiscounted(_, { list }) {
    return list.filter(({ basePrice, price }) => basePrice > price)
  },
}

export const productModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters,
}
