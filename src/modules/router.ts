import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    setTimeout(() => {
      // document.getElementById('main-content-scrollable')?.scrollTo(0, 0)
      document.querySelector('.only-for-get-width')?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' })
    }, 0)
  },
})

router.beforeEach((to, from, next) => {
  next()
})

router.beforeResolve(async (to) => {
  if (to.meta.layoutLoading) {
    setTimeout(() => {
      console.log('layout loading finish')
    }, 300)
  }
})

export function install(app: App<Element>) {
  app.use(router)
}
