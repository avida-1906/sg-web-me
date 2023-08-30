// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'

import './styles/main.css'
import { install } from './modules'

import 'virtual:svg-icons-register'

const app = createApp(App)
install(app)

app.mount('#app')
