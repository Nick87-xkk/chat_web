import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import directives from './directives';
import ElementPlus from 'element-plus';
import socketIO from 'socket.io-client';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(directives);
app.mount('#app');
export const socket = socketIO('ws://127.0.0.1:9892');
