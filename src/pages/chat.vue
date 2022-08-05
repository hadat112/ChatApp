<template>
  <a-spin class="chat-spinner" v-if="loading || loadingChannelInfo" />
  <!-- chatview -->
  <div
    class="chat-view"
    :class="{ loading: loading || loadingChannelInfo, w60: !isShow }"
  >
    <!-- header -->
    <a-layout-header
      v-if="!loadingChannelInfo"
      style="background: #fff; height: fit-content; padding: 0"
    >
      <a-page-header
        v-if="channelInfoList.data.channel_type == 'direct'"
        :title="`${channelInfoList.data.channel_name}`"
        :sub-title="`${channelInfoList.data.partner.position_name}`"
      >
        <template #extra>
          <button
            @click="showInfo"
            style="
              background: #fff;
              border: none;
              outline: none;
              cursor: pointer;
            "
          >
            <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
          </button>
        </template>
      </a-page-header>
      <a-page-header
        v-if="channelInfoList.data.channel_type == 'group'"
        :title="`${channelInfoList.data.channel_name}`"
        :sub-title="`${channelInfoList.data.count_member} thành viên`"
      >
        <template #extra>
          <button
            @click="showInfo"
            style="
              background: #fff;
              border: none;
              outline: none;
              cursor: pointer;
            "
          >
            <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
          </button>
        </template>
      </a-page-header>
      <div class="channel-info-btn"></div>
    </a-layout-header>
    <!-- content -->
    <a-layout-content
      id="layout-content"
      @scroll.prevent="scrollHandle"
      :class="{ stopScroll: loadingMore }"
    >
      <span class="scroll-start-at-top"></span>
      <div class="">
        <!-- loading more-->
        <div class="load-more-msg" style="width: 100%">
          <a-spin class="" style="width: 100%" v-if="loadingMore" />
        </div>
        <div
          :style="{ background: '#fff' }"
          v-for="(item, index) in messageList
            ? messageList.slice().reverse()
            : []"
          :key="index"
        >
          <!--msg time-->
          <msg-time
            v-if="index"
            :time="item.created_at"
            :prevTime="messageList[messageList.length - index].created_at"
          />
          <!-- msg container-->
          <div
            class="message-container"
            :class="{
              self: item.sender.id == '6801990813180061667',
              mt16:
                index &&
                item.sender.id !=
                  messageList[messageList.length - index].sender.id,
            }"
          >
            <!-- msg avatar -->
            <msg-avt
              :index = "index"
              :senderID="item.sender.id"
              :prevSenderID="index ? messageList[messageList.length - index].sender.id : '0'"
              :time="item.created_at"
              :prevTime="index ? messageList[messageList.length - index].created_at : ''"
              :avt="item.sender.avatar"
            />
            <!-- msg content -->
            <div
              class="message-content"
              :class="{
                ml47:
                  index &&
                  item.sender.id ==
                    messageList[messageList.length - index].sender.id &&
                  new Date(item.created_at) -
                    new Date(
                      messageList[messageList.length - index].created_at
                    ) <
                    1800000,
              }"
            >
              <!-- msg name -->
              <div
                v-if="
                  item.sender.id != '6801990813180061667' &&
                  (index == 0 ||
                    item.sender.id !=
                      messageList[messageList.length - index].sender.id ||
                    new Date(item.created_at) -
                      new Date(
                        messageList[messageList.length - index].created_at
                      ) >=
                      1800000)
                "
                class="message-sender"
              >
                {{ item.sender.fullname }}
              </div>
              <!-- msg attachments -->
              <msg-attachments :attachments="item.attachments" />
              <!-- msg-text -->
              <div
                v-if="item.text && item.msg_type == 'text'"
                class="message-text"
                :class="{
                  self: item.sender.id == '6801990813180061667',
                  message_delete: item.desc === '',
                }"
                v-html="markedText(item.text)"
              />
              <!-- msg-forward -->
              <msg-forward
                v-if="item.msg_type == 'forward_message'"
                :msgName="item.quote_message.sender.fullname"
                :msgText="item.text"
                :msgTime="item.quote_message.created_at"
                :senderID="item.sender.id"
                :quoteMessage="item.quote_message.text"
              />
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
    <!-- Typing message -->
    <div class="typing" v-if="typingTest">
      <div class="typing-avt-container">
        <div
          class="message-avt"
          v-if="channelInfoList.data"
          :style="`background-image: url(${typingAvt})`"
        ></div>
      </div>
      <div class="typing-text">Typing</div>
    </div>
    <!-- footer -->
    <a-layout-footer>
      <!-- msg-preview-img -->
      <div class="footer-expand">
        <div
          class="footer-preview-img"
          v-for="(item, index) in filesUrl"
          :key="index"
        >
          <img :src="item" alt="" />
          <span>
            <!-- <a href="">
              <eye-outlined />
            </a> -->
            <button class="delete-preview" @click="deletePreview(index)">
              <delete-outlined />
            </button>
          </span>
        </div>
      </div>
      <form @submit.prevent="sendMessageHandle">
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
              @keyup.enter.prevent="submit"
            />
            <div class="menu-footer-icon">
              <input
                type="file"
                hidden="hidden"
                ref="inputUpload"
                multiple
                @change="onFileSelected"
              />
              <button
                type="button"
                class="upload-img"
                @click.prevent="$refs.inputUpload.click()"
              >
                <picture-filled />
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="send-btn"
            :class="{ active: messageInput || selectFiles[0] }"
          >
            <send-outlined />
          </button>
        </div>
      </form>
    </a-layout-footer>
  </div>

  <channel-info />
</template>

<script>
import {
  EllipsisOutlined,
  SendOutlined,
  MoreOutlined,
  PictureFilled,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { useChannelInfoStore } from "../stores/channel-info.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import MsgForward from "../components/MsgForward.vue";
import MsgAttachments from "../components/MsgAttachments.vue";
import MsgTime from "../components/MsgTime.vue";
import MsgAvt from "../components/MsgAvt.vue";
import ChannelInfo from "./channelInfo.vue";
import Channel from "../components/Channel.vue";

export default {
  components: {
    EllipsisOutlined,
    SendOutlined,
    MoreOutlined,
    PictureFilled,
    DeleteOutlined,
    EyeOutlined,
    MsgForward,
    MsgAttachments,
    MsgTime,
    MsgAvt,
    ChannelInfo,
    Channel,
  },
  setup() {
    const route = useRoute();

    let {
      messageList,
      loading,
      loadingMore,
      error,
      limit,
      currentChannel,
      channelList,
      unread,
    } = storeToRefs(useMessageStore());

    const { fetchMore, sendMessage, token } = useMessageStore();
    const { channelInfoList, loadingChannelInfo, isShow } = storeToRefs(
      useChannelInfoStore()
    );

    let messageInput = ref("");
    let selectFiles = ref([]);
    const filesUrl = ref([]);
    let typingTest = ref(false);
    let typingAvt = ref("");

    // currentChannel.value = route.params.id;

    channelList.value.forEach((index) => {
      unread.value.push(0);
    });

    typingAvt.value = "";
    typingTest.value = false;

    const ws = new WebSocket(
      `wss://ws.ghtk.vn/ws/chat?Authorization=${token}&appType=gchat&appVersion=2022-07-29%2C02%3A14%3A08&device=web&deviceId=zhXaUEkd5S0zxjrNPScW&source=chats`
    );

    ws.onopen = function () {
      ws.send(`${token}|sub|chats_user_6801990813180061667`);
    };

    onMounted(() => {
      ws.onmessage = function (event) {
        let message = JSON.parse(event.data);
        console.log(message);
        if (message.event === "message") {
          typingTest.value = false;
          const lastMsg = {
            attachments: message.data.attachments,
            channel_id: message.data.channel_id,
            channel_mode: message.data.channel_mode,
            channel_type: message.data.channel_type,
            created_at: message.data.created_at,
            id: message.data.id,
            is_pin: message.data.is_pin,
            msg_type: message.data.msg_type,
            ref_id: message.data.ref_id,
            score: message.data.score,
            sender: message.data.sender,
            status: message.data.status,
            text: message.data.text,
            total_seen: message.data.total_seen,
          };

          if (currentChannel.value === message.data.channel_id) {
            messageList.value.unshift(lastMsg);
          }

          let scroll = document.querySelector("#layout-content");
          scroll.scrollTop = 0;
          // fetchNewMessage()
          // fetchNewChannel();
          channelList.value.forEach((channel, index) => {
            if (channel.channel_id === message.data.channel_id) {
              unread.value.unshift(unread.value.splice(index, 1)[0]);
              channelList.value.unshift(channelList.value.splice(index, 1)[0]);
              if (currentChannel.value != message.data.channel_id) {
                unread.value[index]++;
              }
              channel.last_message = lastMsg;
            }
          });
        } else if (message.event === "update_count_message_unread") {
          channelList.value.forEach((channel, index) => {
            if (channel.channel_id === message.data.channel_id) {
              unread.value[index] = 0;
            }
          });
        } else if (message.event === "typing") {
          if (currentChannel.value === message.data.channel_id) {
            typingAvt.value = message.data.sender.avatar;
            typingTest.value = true;
          }
        }
        // console.log(typingTest.value);
      };
    });

    function showInfo() {
      isShow.value = !isShow.value;
    }

    async function sendMessageHandle() {
      if ((messageInput.value || selectFiles.value) && currentChannel.value)
        await sendMessage(messageInput.value, selectFiles.value);
      messageInput.value = "";
      selectFiles.value = [];
      filesUrl.value = [];
    }
    async function scrollHandle(e) {
      const { target } = e;
      // console.log(Math.ceil(-target.scrollTop), target.scrollHeight - target.offsetHeight + 15);
      if (
        Math.ceil(-target.scrollTop) >=
          Math.ceil(target.scrollHeight - target.offsetHeight + 15) &&
        limit.value < 100 &&
        !loadingMore.value
      ) {
        limit.value += 10;
        await fetchMore();
        // console.log(messageList.value.length)
        // console.log(limit.value)
      }
    }

    function onFileSelected(e) {
      Object.values(e.target.files).forEach((file) => {
        selectFiles.value.push(file);
        filesUrl.value.push(URL.createObjectURL(file));
      });
    }

    function deletePreview(index) {
      filesUrl.value.splice(index, 1);
      selectFiles.value.splice(index, 1);
    }
    return {
      messageList,
      loading,
      loadingMore,
      loadingChannelInfo,
      messageInput,
      sendMessageHandle,
      showInfo,
      isShow,
      scrollHandle,
      onFileSelected,
      filesUrl,
      selectFiles,
      channelInfoList,
      deletePreview,
      typingTest,
      typingAvt,
    };
  },
};
</script>;
