import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import "./assets/styles/main.css"
import "./assets/styles/chat-info.css"
import { marked } from 'marked';

import { createPinia } from 'pinia';
import {
    Layout,
    List,
    PageHeader,
    Spin,
    Image
} from 'ant-design-vue'

const markedMixin = {
    methods: {
        markedText: function (text) {
            if (text)
                return marked(text);
        }
    }
}

const app = createApp(App);
app.mixin(markedMixin)
app.use(Layout);
app.use(List);
app.use(Spin);
app.use(PageHeader);
app.use(Image);
app.use(router);
app.use(createPinia());
app.mount('#app');