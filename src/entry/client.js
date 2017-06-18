import Vue from 'vue'
import { createApp } from './app'

// Polyfill provided by babel for promise for unsupported browsers;
// Assign to window for libaries to use.
if (!window.Promise) window.Promise = Promise

// a global mixin that calls `fetch` when a route component's params change
Vue.mixin({
  async beforeRouteUpdate(to, from, next) {
    const { fetch, refetch } = this.$options
    if (!fetch || !refetch) return next
    try {
      await fetch(this.$store, to, from)
      return next()
    } catch (error) {
      return next(error)
    }
  },
})

const { app, router, store } = createApp()

router.onReady(() => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter(
      (c, i) => diffed || (diffed = prevMatched[i] !== c || !!c.refetch),
    )

    const hooks = activated.map(c => c.fetch).filter(fetch => !!fetch)

    if (hooks.length) {
      await Promise.all(hooks.map(hook => hook && hook(store, to, from)))
    }

    next()
  })

  // Actually mount to DOM
  app.$mount('#app')
})

// service worker
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
}
