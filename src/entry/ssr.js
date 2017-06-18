import { createApp } from './app'

export default async function serverEntry(context) {
  const { app, store, router } = createApp()
  router.push(context.url)

  try {
    await new Promise((resolve, reject) => {
      router.onReady(() => {
        // Check route has components, if not dispatch 404 error
        const components = router.getMatchedComponents()
        if (!components.length) {
          store.dispatch('context/setError', { status: 404, message: 'Page not found' })
          resolve()
          return
        }

        fetchData(components, store, router.currentRoute)
          .then(resolve)
          .catch(reject)
      })
    })
  } catch (e) {
    const status = error.response ? error.response.status : error.status || 500
    const message = error.response ? error.response.statusText : error.message || 'Critical Error'
    await store.dispatch('context/setError', { status, message })
  }

  context.state = store.state
  return app
}

function fetchData(components, store, currentRoute) {
  return Promise.all([
    ...components
      .filter(({ fetch }) => !!fetch)
      .map(({ fetch }) => fetch(store, currentRoute, null)),
  ])
}
