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
    <a-layout-content @scroll="scrollHandle">
      <div :style="{ background: '#fff' }">
        <div
          class="message-container"
          :class="{ 
            self: item.sender.id == '6801990813180061667',
            mt16: index && item.sender.id != messageList.data[messageList.data.length-index].sender.id
          }"
          v-for="(item, index) in messageList.data
            ? messageList.data.slice().reverse()
            : []"
          :key="index"
        >
          <div class="message-avt-container"
            v-if="index && item.sender.id != '6801990813180061667' && item.sender.id != messageList.data[messageList.data.length-index].sender.id"
          >
            <div class="message-avt"
              :style="`background-image: url(${item.sender.avatar})`"
            ></div>
          </div>
          <div class="message-content" :class="{ml47: index && item.sender.id == messageList.data[messageList.data.length-index].sender.id}">
            <div
              v-if="index && item.sender.id != '6801990813180061667'  && item.sender.id != messageList.data[messageList.data.length-index].sender.id"
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
      <div class="footer-expand">
      </div>
      <form v-on:submit.prevent="sendMessageHandler">
        <div class="footer-input">
  
          <div class="message-more">
            <ellipsis-outlined />
          </div>
    
          <div class="menu-footer">
            <input
              type="text"
              placeholder="Nhập nội dung tin nhắn"
              name=""
              v-model="messageInput"
              @keyup.enter="sendMessageHandler"
            />
            <div class="menu-footer-icon">
              <input type="file" hidden="hidden" ref="inputUpload" @change="onFileSelected">
              <button class="upload-img" @click="$refs.inputUpload.click()">
                <picture-filled />
              </button>
            </div>
          </div>
          <button
            class="send-btn"
            :class="{ active: messageInput }"
          >
            <send-outlined />
          </button>
        </div>
      </form>
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
  PictureFilled
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";
export default {
  components: {
    EllipsisOutlined,
    SendOutlined,
    MoreOutlined,
    DoubleRightOutlined,
    PictureFilled
  },
  methods: {
    
  },
  setup() {
    let messageInput = ref("");
    const route = useRoute();
    let { messageList, loading, error, limit, currentChannel} = storeToRefs(useMessageStore());
    const { fetchMessage, sendMessage } = useMessageStore();
    const isShow = ref(true);
    let selectFiles = ref([]);
    currentChannel.value = route.params.id;
    fetchMessage();

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

    async function sendMessageHandler() {
      if(messageInput.value && channelID.value) await sendMessage(messageInput.value, selectFiles.value);
      messageInput.value = "";
      selectFiles.value = [];
    }

    function scrollHandle(e) {
      const { target } = e;
      if (
        Math.ceil(-target.scrollTop) >=
        target.scrollHeight - target.offsetHeight +15 && loading
      ) {
        limit.value+=20;
        fetchMessage()
      }
    };

    function onFileSelected(e) {
      selectFiles.value.push(e.target.files[0]);
      console.log(selectFiles.value);
    }

    return {
      messageList,
      loading,
      messageInput,
      sendMessageHandler,
      showInfo,
      isShow,
      urlify,
      getTime,
      scrollHandle,
      onFileSelected
    };
  },
};
</script>