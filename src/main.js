import { createApp } from 'vue'
import App from './components/App/App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
