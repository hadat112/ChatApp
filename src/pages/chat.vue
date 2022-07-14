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
      <div :style="{ background: '#fff' }">
        <div
          id="message-container"
          class="message-container"
          v-for="(item, index) in messageList.data
            ? messageList.data.slice().reverse()
            : []"
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
      <div class="message-more">
        <ellipsis-outlined />
      </div>
      <input
        type="text"
        placeholder="Nhập nội dung tin nhắn"
        name=""
        v-model="messageInput"
      />
      <button class="send-btn" :class="{ active: messageInput }">
        <send-outlined />
      </button>
    </a-layout-footer>
  </div>
  <div class="chat-info"></div>
</template>

<script>
import {
  EllipsisOutlined,
  SendOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  components: {
    EllipsisOutlined,
    SendOutlined,
    MoreOutlined,
  },
  setup() {
    let messageInput = ref("");
    const route = useRoute();
    const { messageList, loading, error } = storeToRefs(useMessageStore());
    const { fetchMessage } = useMessageStore();
    let channelID = route.params.id;
    fetchMessage(channelID, 40);
    onMounted(() => {
      function overflowDetector(x) {
        return x.style.overflow;
      }

      console.log("overflowDetector: " +        document.querySelector('#message-container'));

      // var overflow = overflowDetector(
      //   document.querySelector("#message-container")
      // );
      // if (overflow === "scroll") {
      //   alert("overflow : scroll");
      // } else {
      //   alert("overflow : " + overflow);
      // }
    });
    return { messageList, loading, messageInput };
  },

};
</script>