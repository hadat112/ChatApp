<template>
  <div class="chat-view" :class="{ loading: loading }">
    <a-spin class="chat-spinner" v-if="loading" />
    <a-layout-header style="background: #fff; height: fit-content; padding: 0">
      <a-page-header title="Hà Đạt" sub-title="Web engineer">
        <template #extra >
        <butto @click="showInfo">
          <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
        </butto>
        </template>
      </a-page-header>
      <div class="channel-info-btn"></div>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ background: '#fff' }">
        <div
          class="message-container" :class="{self: item.sender.id == '6801990813180061667'}"
          v-for="(item, index) in messageList.data
            ? messageList.data.slice().reverse()
            : []"
          :key="index"
        >
          <div v-if="item.sender.id != '6801990813180061667'" class="message-avt-container">
            <div
              class="message-avt"
              :style="`background-image: url(${item.sender.avatar})`"
            ></div>
          </div>
          <div class="message-content" >
            <div v-if="item.sender.id != '6801990813180061667'" class="message-sender">
              {{ item.sender.fullname }}
            </div>
            <div class="message-text" :class="{self: item.sender.id == '6801990813180061667'}">
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
      <button class="send-btn" :class="{ active: messageInput }" @click="sendMessageHandler">
        <send-outlined />
      </button>
    </a-layout-footer>
  </div>'
  <div class="chat-info" :class="{chatinfobtn: isShow}" style="width: 370px; background-color: black "></div>
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
import { ref } from "vue";
import { message } from "ant-design-vue";

export default {
  components: {
    EllipsisOutlined,
    SendOutlined,
    MoreOutlined,
  },
  methods: {
    scrollHandle(e) {
      const { target } = e;
      console.log('jj');
      if (
        Math.ceil(target.scrollTop) <=
        target.scrollHeight - target.offsetHeight
      ) {
        console.log("scroll");
        //this code will run when the user scrolls to the bottom of this div so
        //you could do an api call here to implement lazy loading
        this.bottom = true;
      }
    },
  },
  setup() {
    let messageInput = ref("");
    const route = useRoute();
    const { messageList, loading, error } = storeToRefs(useMessageStore());
    const { fetchMessage } = useMessageStore();
    const isShow = ref(true);
    let channelID = route.params.id;
    let limit = 40;
    fetchMessage(channelID, limit);
    if(messageList) console.log(messageList.value.data);

    function showInfo() {
      isShow.value = !isShow.value;
    }

    function sendMessageHandler() {

    }

    return { messageList, loading, messageInput, sendMessageHandler, showInfo, isShow };
  }
};
</script>