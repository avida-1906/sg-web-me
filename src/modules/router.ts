import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import generatedRoutes from '~pages'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    /** 是否需要登录 */
    auth?: boolean
    /** 浏览器标题 */
    browserTitle?: string
    /** layout with-menu 标题 */
    withMenuTitle?: string
    /** layout with-menu 图标 */
    withMenuIcon?: string
    /** layout with-menu 菜单数据 */
    withMenuMenu?: Array<{ title: string; path: string }>
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
  title.value = to.meta.browserTitle || 'Stake.com'

  const auth = to.meta.auth || false

  if (auth) {
    const appStore = useAppStore()
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
