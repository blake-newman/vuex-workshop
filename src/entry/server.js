import createApp from './app'

export default function serverEntry (context) {
  const { app, router, store } = createApp()
  router.push(context.url)

  return new Promise((resolve, reject) => {
    router.onReady(() => {
      // Check route has components, if not dispatch 404 error
      const components = router.getMatchedComponents()
      if (!components.length) throw new Error(`404: ${context.url}`)

      Promise.all([
        ...components
          .map(({ asyncData }) => asyncData)
          .filter(_ => !!_)
          .map(asyncData => asyncData(store, router.currentRoute, null))
      ]).then(resolve).catch(reject)
    }, reject)
  })
  .then(() => {
    context.state = store.state
    return app
  })
}
