import createApp from './app'

export default function serverEntry (context) {
  const { app, router, store } = createApp()
  router.push(context.url)

  return new Promise((resolve, reject) => {
    router.onReady(() => {
      // Check route has components, if not dispatch 404 error
      const components = router.getMatchedComponents()
      if (!components.length) {
        store.state.error = { status: 404, message: 'Not Found' }
        resolve()
        return
      }

      Promise.all([
        ...components
          .map(({ asyncData }) => asyncData)
          .filter(_ => !!_)
          .map(asyncData => asyncData(store, router.currentRoute, null))
      ]).then(resolve).catch(reject)
    }, reject)
  })
  .catch(error => {
    const status = error.response ? error.response.status : error.status || 500
    const message = error.response ? error.response.statusText : error.message
    store.state.error = { status, message }
  })
  .then(() => {
    context.state = store.state
    return app
  })
}
