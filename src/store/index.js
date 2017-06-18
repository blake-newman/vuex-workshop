import Vue from 'vue'
import Vuex from 'vuex'
import { basketModule } from './modules/basket'
import { productModule } from './modules/product'
import { contextModule } from './modules/context'

Vue.use(Vuex)

export function createStore() {
  const store = new Vuex.Store({
    modules: {
      basket: basketModule,
      product: productModule,
      context: contextModule,
    },

    strict: process.env.NODE_ENV !== 'production',
  })

  if (module.hot) {
    module.hot.accept(['./modules/basket', './modules/product', './modules/context'], () => {
      store.hotUpdate({
        modules: {
          basket: require('./modules/basket').basketModule,
          product: require('./modules/product').productModule,
          context: require('./modules/product').contextModule,
        },
      })
    })
  }

  return store
}
