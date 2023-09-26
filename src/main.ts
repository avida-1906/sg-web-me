// import Previewer from 'virtual:vue-component-preview'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import App from './App.vue'

import './styles/reset.scss'
import './styles/main.scss'
import './styles/animate.scss'
import { install } from './modules'

import 'virtual:svg-icons-register'

import './modules/vue-request'

// 是否润年插件
dayjs.extend(isLeapYear)

const app = createApp(App)
install(app)

app.mount('#app')
