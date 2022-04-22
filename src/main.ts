import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import directives from './directives';
import ElementPlus from 'element-plus';
import store from './store';

export const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(directives);
app.use(store);
app.mount('#app');
