import { createApp } from 'vue'
import App from './App.vue'
import {defineAsyncComponent} from 'vue'
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import {
    Layout,
    LayoutHeader,
    LayoutSider,
    LayoutContent,
    LayoutFooter,
    List,
    PageHeader,
} from 'ant-design-vue'


const app = createApp(App);

app.component(
    "message", 
    defineAsyncComponent(() => import("./layouts/message.vue")),
)
app.use(Layout);
app.use(LayoutHeader);
app.use(LayoutSider);
app.use(LayoutFooter);
app.use(LayoutContent);
app.use(List);
app.use(PageHeader);

app.use(router);
app.mount('#app')