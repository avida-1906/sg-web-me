import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import type { App } from 'vue'

export function install(app: App<Element>) {
  app.use(FloatingVue)
}
