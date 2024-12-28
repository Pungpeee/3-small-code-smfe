import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import navbarleft from './components/navbarleft.vue'
import store from './store'


const app = createApp(App)
app.config.globalProperties.firebaseBase = "https://us-central1-iot-systems-1bd8a.cloudfunctions.net/webApi"
app.config.globalProperties.apiBase = "/api/v1"
app.component('navbarleft', navbarleft)
app.use(store).use(router).mount('#app')
router.store = store
