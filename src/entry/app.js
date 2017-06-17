import 'babel-polyfill'
import Vue from 'vue'
import App from '../views/App.vue'
import { createApi } from '../api'
import { createRouter } from '../router'
import { createStore } from '../store'
import * as filters from '../utils/filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Set profiling in the browser devtool timeline
// https://vuejs.org/v2/api/#performance
Vue.config.performance = process.env.NODE_ENV !== 'production'

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
export function createApp() {
  const router = createRouter()
  const store = createStore()

  createApi()

  const app = new Vue({
    router,
    store,
    ...App,
  })

  return { app, store, router }
}
