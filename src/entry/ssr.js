import { createApp } from './app'

export default async function serverEntry(context) {
  const { app, router } = createApp()
  router.push(context.url)

  try {
    await new Promise((resolve, reject) => {
      router.onReady(() => {
        // Check route has components, if not dispatch 404 error
        const components = router.getMatchedComponents()
        if (!components.length) throw new Error(`404: ${context.url}`)
        resolve()
      })
    })
    return app
  } catch (_) {
    return app
  }
}
