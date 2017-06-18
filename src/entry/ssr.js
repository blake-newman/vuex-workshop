import { createApp } from './app'

export default async function serverEntry(context) {
  const { app, store, router } = createApp()
  router.push(context.url)

  try {
    await new Promise((resolve, reject) => {
      router.onReady(() => {
        // Check route has components, if not dispatch 404 error
        const components = router.getMatchedComponents()
        if (!components.length) throw new Error(`404: ${context.url}`)
        fetchData(components, store, router.currentRoute)
          .then(resolve)
          .catch(reject)
      })
    })
  } catch (e) {
    console.error(e)
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
