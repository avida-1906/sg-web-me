import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import generatedRoutes from '~pages'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    /** 是否需要登录 */
    auth?: boolean
  }
}

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    setTimeout(() => {
      document.querySelector('.only-for-get-width')?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' })
    }, 0)
  },
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  if (to.meta.top && to.meta.top === from.meta.top)
    appStore.setNeedAnimateBool(false)

  else if (to.name !== from.name)
    appStore.setNeedAnimateBool(true)

  else
    appStore.setNeedAnimateBool(false)

  const auth = to.meta.auth || false

  if (auth) {
    const { isLogin } = storeToRefs(appStore)
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
