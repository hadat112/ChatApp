<template>
  <div class="chat-view" :class="{ loading: loading }">
    <a-spin class="chat-spinner" v-if="loading" />
    <a-layout-header style="background: #fff; height: fit-content; padding: 0">
      <a-page-header title="Hà Đạt" sub-title="Web engineer">
        <template #extra>
          <button @click="showInfo" style="background: #fff; border: none">
            <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
          </button>
        </template>
      </a-page-header>
      <div class="channel-info-btn"></div>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ background: '#fff' }">
        <div
          class="message-container"
          :class="{ self: item.sender.id == '6801990813180061667' }"
          v-for="(item, index) in messageList.data
            ? messageList.data.slice().reverse()
            : []"
          :key="index"
        >
          <div
            v-if="item.sender.id != '6801990813180061667'"
            class="message-avt-container"
          >
            <div
              class="message-avt"
              :style="`background-image: url(${item.sender.avatar})`"
            ></div>
          </div>
          <div class="message-content">
            <div
              v-if="item.sender.id != '6801990813180061667'"
              class="message-sender"
            >
              {{ item.sender.fullname }}
            </div>
            <div class="message-attachments">
              <div v-for="attachment in item.attachments" :key="attachment.id" class="message-attachments-item">
              <img :src="`${attachment.url}`" alt="">
              </div>
            </div>
            <div
              v-if="item.text && item.msg_type == 'text'"
              class="message-text"
              :class="{ self: item.sender.id == '6801990813180061667', message_delete: item.text === 'Tin nhắn đã được thu hồi' }"
              v-html="urlify(item.text)"
            ></div>
            <div
              v-if="item.msg_type == 'forward_message'"
              class="message-forward"
              :class="{ self: item.sender.id == '6801990813180061667' }"
            >
              <div class="message-forward-icon">
                <double-right-outlined />
              </div>
              <div class="message-forward-des">
                <div
                  class="message-forward_text"
                  v-html="urlify(item.quote_message.text)"
                ></div>
                <div class="message-forward-info">
                  {{ item.quote_message.sender.fullname }},
                  {{ getTime(item.quote_message.created_at) }}
                </div>
              </div>
              <div
                class="message-forward-text"
                v-html="urlify(item.text)"
              ></div>
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
      <button
        class="send-btn"
        :class="{ active: messageInput }"
        @click="sendMessageHandler"
      >
        <send-outlined />
      </button>
    </a-layout-footer>
  </div>
  '
  <div
    class="chat-info"
    :class="{ chatinfobtn: isShow }"
    style="width: 370px; background-color: black"
  ></div>
</template>

<script>
import {
  EllipsisOutlined,
  SendOutlined,
  MoreOutlined,
  DoubleRightOutlined,
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
    DoubleRightOutlined,
  },
  methods: {
    scrollHandle(e) {
      const { target } = e;
      console.log("jj");
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

    if (messageList) console.log(messageList.value.data);

    function showInfo() {
      isShow.value = !isShow.value;
    }

    function urlify(text) {
      if (text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
          return '<a href="' + url + '">' + url + "</a>";
        });
      }
    }

    function normalizeDate(number) {
      return number < 10 ? "0" + number : number;
    }

    function getTime(date) {
      let d = new Date(date);
      let time;
      time =
        normalizeDate(d.getDate()) +
        "/" +
        normalizeDate(d.getMonth() + 1) +
        "/" +
        d.getFullYear() + " "
        + normalizeDate(d.getHours()) + ":"
        + normalizeDate(d.getMinutes()) + " "
        + d.getDay();
      return time;
    }

    function sendMessageHandler() {}

    return {
      messageList,
      loading,
      messageInput,
      sendMessageHandler,
      showInfo,
      isShow,
      urlify,
      getTime,
    };
  },
};
</script>