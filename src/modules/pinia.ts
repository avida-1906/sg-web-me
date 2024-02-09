import { createPinia } from 'pinia'
import type { App } from 'vue'

const pinia = createPinia()

export function install(app: App<Element>) {
  app.use(pinia)
}
