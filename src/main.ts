import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

import './index.scss';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
(window as any).bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
createApp(App).use(store).use(router).mount('#app');
