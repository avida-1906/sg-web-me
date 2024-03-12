// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'

import './styles/reset.scss'
import './styles/main.scss'
import './styles/animate.scss'

import './styles/tailwindcss.css'
import { install } from './modules'

import 'virtual:svg-icons-register'
import './modules/vue-request'


const app = createApp(App)
install(app)

app.mount('#app')
