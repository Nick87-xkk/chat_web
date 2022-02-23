import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import directives from './directives';
import ElementPlus from 'element-plus'

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(directives);
app.mount('#app');
