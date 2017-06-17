import createApp from './app'

// Polyfill provided by babel for promise for unsupported browsers;
// Assign to window for libaries to use.
if (!window.Promise) window.Promise = Promise

const { app, router } = createApp()

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Actually mount to DOM
  app.$mount('#app')
})

// service worker
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
