import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import detectMobile from './mixins/detectMobile';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

(window as any).bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
const app = createApp(App);
app.use(store).use(router).mixin(detectMobile);

app.mount('#app');
