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

  if (module.hot) {
    module.hot.accept([
      './modules/basket',
      './modules/product'
    ], () => {
      store.hotUpdate({
        modules: {
          basket: require('./modules/basket').default,
          product: require('./modules/product').default
        }
      })
    })
  }

  return store
}
