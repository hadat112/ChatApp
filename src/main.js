import { createApp } from 'vue'
import App from './App.vue'
import {defineAsyncComponent} from 'vue'
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import { createPinia } from 'pinia';
import '/home/tranhuyhoan/Documents/GitHub/ChatApp/src/assets/styles/chat-info.css';

import {
    Layout,
    List,
    PageHeader,
} from 'ant-design-vue'

const app = createApp(App);

app.use(Layout);
app.use(List);
app.use(PageHeader);
app.use(router);
app.use(createPinia());
app.mount('#app');