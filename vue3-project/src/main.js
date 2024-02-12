import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import '@/assets/less/index.less';
import '@/assets/css/index.css';
import store from './store.js';
import './api/mock.js';
import api from './api/api'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQq, faWeixin, faTiktok, faWeibo } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


library.add(faQq, faWeixin, faTiktok, faWeibo);


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.config.globalProperties.$api = api;
store.commit("addMenu",router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).use(store).use(ElementPlus);

app.mount('#app');