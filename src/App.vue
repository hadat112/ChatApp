<template>
  <component :is="layout">
    <template #sider>
      <div class="header-channel-list">
        <span>Chat nội bộ</span>
        <bell-outlined style="font-size: 24px; color: #009149"></bell-outlined>
      </div>
      <channel></channel>
    </template>
    <template #chat>
      <router-view></router-view>
    </template>
  </component>
</template>

<script>
import Message from "./layouts/message.vue";
import Channel from "./components/Channel.vue";
import { BellOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  components: {
    BellOutlined,
    Channel,
    Message,
  },

  data() {
    return {
      layout: "message",
    };
  },

  setup() {
    
  },
});
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {margin: 0; height: 100%; overflow: hidden}

body {
  padding: 0;
  font-family: Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>