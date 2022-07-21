import { createApp } from 'vue'
import App from './App.vue'
import {defineAsyncComponent} from 'vue'
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import { createPinia } from 'pinia'
import "./assets/styles/main.css"
import InfiniteScroll from 'v-infinite-scroll'
 
import 'v-infinite-scroll/dist/v-infinite-scroll.css'
 
import {
    Layout,
    List,
    PageHeader,
    Spin
} from 'ant-design-vue'

const app = createApp(App);
app.use(InfiniteScroll)
app.use(Layout);
app.use(List);
app.use(Spin);
app.use(PageHeader);
app.use(router);
app.use(createPinia());
app.mount('#app');