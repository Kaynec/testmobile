import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import detectMobile from './mixins/detectMobile';
// import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
(window as any).bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
const app = createApp(App).use(Quasar, quasarUserOptions);
app.use(store).use(router).mixin(detectMobile);

app.mount('#app');
