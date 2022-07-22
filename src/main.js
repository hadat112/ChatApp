import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import "./assets/styles/main.css"
import "./assets/styles/chat-info.css"
 
import { createPinia } from 'pinia';

import {
    Layout,
    List,
    PageHeader,
    Spin
} from 'ant-design-vue'

const app = createApp(App);
app.use(Layout);
app.use(List);
app.use(Spin);
app.use(PageHeader);
app.use(router);
app.use(createPinia());
app.mount('#app');