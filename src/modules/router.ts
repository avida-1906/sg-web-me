import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import generatedRoutes from '~pages'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    auth?: boolean
  }
}

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    setTimeout(() => {
      document.querySelector('.only-for-get-width')?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' })
    }, 0)
  },
})

router.beforeEach((to, from, next) => {
  const auth = to.meta.auth || false

  if (auth) {
    const { isLogin } = storeToRefs(useAppStore())
    if (!isLogin.value) {
      const { openRegisterDialog } = useRegisterDialog()
      openRegisterDialog()
      next('/')
      return
    }
  }

  if (httpClient.cancelTokenList.length > 0)
    httpClient.cancelAllRequest()

  next()
})

export function install(app: App<Element>) {
  app.use(router)
}
