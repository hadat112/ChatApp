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
import { defineComponent } from "vue";
import {useStore} from "pinia"
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
    const store = useStore()
    store.fetchUserPreferences();
    console.log("Starting message");
  },
});
</script>