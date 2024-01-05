import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import '@/assets/css/index.css'
import store from './store.js';

createApp(App).use(router).use(store).mount('#app');