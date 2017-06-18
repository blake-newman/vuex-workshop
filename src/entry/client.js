import Vue from 'vue'
import createApp from './app'

// Polyfill provided by babel for promise for unsupported browsers;
// Assign to window for libaries to use.
if (!window.Promise) window.Promise = Promise

// a global mixin that calls `fetch` when a route component's params change
Vue.mixin({
  async beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (!asyncData) return next
    try {
      await asyncData(this.$store, to, from)
      return next()
    } catch (error) {
      return next(error)
    }
  }
})

const { app, router, store } = createApp()

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  router.beforeResolve(async (to, from, next) => {
    // Check difference between to and from
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)))

    const hooks = activated.map(({ asyncData }) => asyncData).filter(_ => !!_)

    // If no hooks to call then return and resolve
    if (!hooks.length) return next()

    // preFetch data
    try {
      const res = await Promise.all(hooks.map(hook => hook(store, to, from)))
      next(res)
    } catch (error) {
      next(error)
    }
  })

  // Actually mount to DOM
  app.$mount('#app')
})

// service worker
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
