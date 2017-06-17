import Vue from 'vue'
import Vuex from 'vuex'
import { basketModule } from './modules/basket'
import { productModule } from './modules/product'

Vue.use(Vuex)

export function createStore() {
  const store = new Vuex.Store({
    modules: {
      basket: basketModule,
      product: productModule,
    },

    strict: process.env.NODE_ENV !== 'production',
  })

  if (module.hot) {
    module.hot.accept(['./modules/basket', './modules/product'], () => {
      store.hotUpdate({
        modules: {
          basket: require('./modules/basket').basketModule,
          product: require('./modules/product').productModule,
        },
      })
    })
  }

  return store
}
