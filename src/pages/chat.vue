<template>
  <div class="chat-view" :class="{ loading: loading }">
    <a-spin class="chat-spinner" v-if="loading" />
    <a-layout-header style="background: #fff; height: fit-content; padding: 0">
      <a-page-header title="Hà Đạt" sub-title="Web engineer">
        <template #extra>
          <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
        </template>
      </a-page-header>
      <div class="channel-info-btn"></div>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ padding: '24px', background: '#fff', height: '100vh' }">
        <div
          class="message-container"
          v-for="(item, index) in messageList.data"
          :key="index"
        >
          <div class="message-avt-container">
            <div
              class="message-avt"
              :style="`background-image: url(${item.sender.avatar})`"
            ></div>
          </div>
          <div class="message-content">
            <div class="message-sender">
              {{ item.sender.fullname }}
            </div>
            <div class="message-text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer>
      <input type="text" placeholder="Nhập nội dung tin nhắn" name="" v-model="messageInput" />
      <button class="send-btn" :class="{active: messageInput}">
        <send-outlined />
      </button>
    </a-layout-footer>
  </div>
  <div class="chat-info"></div>
</template>

<script>
import { EllipsisOutlined, SendOutlined } from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  components: {
    EllipsisOutlined,
    SendOutlined,
  },
  setup() {
    let messageInput = ref("");
    const route = useRoute();
    const { messageList, loading, error } = storeToRefs(useMessageStore());
    const { fetchMessage } = useMessageStore();
    let channelID = route.params.id;
    fetchMessage(channelID, 40);
    return { messageList, loading, messageInput };
  },
};
</script>