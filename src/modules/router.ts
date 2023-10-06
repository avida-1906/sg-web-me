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
const title = useTitle()

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
  console.log(to.meta)
  console.log(to.path)
  title.value = (to.meta.browserTitle || 'Stake.com') as string

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
