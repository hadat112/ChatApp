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
import Chat from "./pages/chat.vue";
import Message from "./layouts/message.vue";
import Channel from "./components/Channel.vue";
import {
  BellOutlined,
  EllipsisOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    BellOutlined,
    EllipsisOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    Channel,
    Message,
    Chat,
  },

  data() {
    return {
      layout: "message",
    };
  },
});
</script>