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

router.beforeEach((to, from, next) => {
  // 检查即将进入的路由是否以/console开头
  if (to.path.startsWith('/console')) {
    // 如果是/console开头的路径，则检查token
    store.commit('getToken');
    const token = store.state.token;

    // 如果没有token且不是登录页面，则重定向到登录页面
    if (!token && to.name !== 'reallogin') {
      next({ name: 'reallogin' });
    } else {
      // 如果有token或者是登录页面，就继续
      next();
    }
  } else {
    // 如果不是/console开头的路径，就直接放行
    next();
  }
});

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).use(store).use(ElementPlus);

app.mount('#app');