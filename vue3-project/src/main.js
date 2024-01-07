import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import '@/assets/css/index.css';
import store from './store.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQq, faWeixin, faTiktok, faWeibo } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faQq, faWeixin, faTiktok, faWeibo);


const app = createApp(App);


app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).use(store);

app.mount('#app');