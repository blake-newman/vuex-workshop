import Vue from 'vue'
import Vuex from 'vuex'
import basket from './modules/basket'
import product from './modules/product'

Vue.use(Vuex)

export default function create () {
  const store = new Vuex.Store({
    modules: {
      basket,
      product
    },

    strict: process.env.NODE_ENV !== 'production'
  })

  return store
}
