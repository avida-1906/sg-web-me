import type { App } from 'vue'
import { install as installI18n } from './i18n'
import { install as installRouter } from './router'
import { install as installPinia } from './pinia'
import { install as installFloating } from './floating'

export function install(app: App<Element>) {
  installI18n(app)
  installRouter(app)
  installPinia(app)
  installFloating(app)
}
