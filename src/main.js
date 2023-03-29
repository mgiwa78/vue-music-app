import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import router from './router'

import { registerSW } from 'virtual:pwa-register'
import Icon from './directives/icon'
import VeeValidationPlugin from './includes/validation'
import './assets/base.css'
import './assets/main.css'
import { auth } from './includes/firebase'
import router from './router'
registerSW({ immediate: true })
let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidationPlugin)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})