import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { pinia } from '@/stores'
import i18n from '@/i18n'
import installDirective from '@/directives'
import installFilters from '@/filters'

import '@/icons'
import '@/styles/index.scss'
import './permission'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
installFilters(app)
installDirective(app)

app.mount('#app')
