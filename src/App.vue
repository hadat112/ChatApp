<template>
  <component :is="layout">
    <template #sider>
      <div class="header-channel-list">
        <div class="">
          <menu-outlined />
          <span style="margin-left: 16px">Chat nội bộ</span>
        </div>
        <bell-outlined style="font-size: 20px; color: #009149"></bell-outlined>
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
import { BellOutlined, MenuOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    BellOutlined,
    Channel,
    Message,
    MenuOutlined,
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