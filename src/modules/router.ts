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
    withMenuMenu?: Array<{ title: string; path: string; token?: boolean; isT?: boolean }>
    /** layout with-menu 移动端菜单展示方式 */
    withMenuMobileType?: 'tabs' | 'select'
    /** 布局配置 */
    withMenuLayoutConf?: { padding?: string; borderRadius?: string }
  }
}

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash.length)
      return
    scrollToTop()
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  const { isLogin } = storeToRefs(appStore)
  const { openRegisterDialog } = useRegisterDialog()
  const auth = to.meta.auth || false
  if (to.query.uid && !isLogin.value)
    Session.set(STORAGE_REG_PARENT_ID, to.query.uid)

  if (to.path === '/') {
    next('/casino')
    return
  }

  if (auth) {
    if (!isLogin.value) {
      openRegisterDialog()
      next('/')
      return
    }
  }

  next()
})

export function install(app: App<Element>) {
  app.use(router)
}
