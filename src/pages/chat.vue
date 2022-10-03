<template>
  <a-spin class="chat-spinner" v-if="loading || loadingChannelInfo" />
  <!-- chatview -->
  <div
    class="chat-view"
    style="overflow: scroll"
    :class="{ loading: loading || loadingChannelInfo, w60: !isShow }"
    @scroll.prevent="scrollHandle"
  >
    <!-- content -->
    <div
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
              :index="index"
              :senderID="item.sender.id"
              :prevSenderID="
                index ? messageList[messageList.length - index].sender.id : '0'
              "
              :time="item.created_at"
              :prevTime="
                index ? messageList[messageList.length - index].created_at : ''
              "
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
              <msg-attachments
                v-if="item.attachments"
                :attachments="item.attachments"
              />
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
                v-if="item.msg_type == 'quote_message'"
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
    </div>
    <!-- Typing message -->
    <div
      class="typing"
      v-if="typingTest && channel_id === channelInfoList.channel_id"
    >
      <div class="typing-avt-container">
        <div
          class="message-avt"
          v-if="channelInfoList"
          :style="`background-image: url(${typingAvt})`"
        ></div>
      </div>
      <div class="typing-text">
        <img
          class="item-channel__typing"
          src="https://ghtk.me/images/dots.gif"
          alt="Dot"
        />
      </div>
    </div>
  </div>

  <channel-info />
</template>

<script setup>
import { useMessageStore } from "../stores/message-list.js";
import { useChannelInfoStore } from "../stores/channel-info.js";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import MsgForward from "../components/MsgForward.vue";
import MsgAttachments from "../components/MsgAttachments.vue";
import MsgTime from "../components/MsgTime.vue";
import MsgAvt from "@/components/MsgAvt.vue";
import ChannelInfo from "./channelInfo.vue";

let {
  messageList,
  loading,
  loadingMore,
  limit,
  currentChannel,
  typingChannel,
  channelList,
  unread,
  typingTest,
} = storeToRefs(useMessageStore());

const { fetchMore, token } = useMessageStore();
const { channelInfoList, loadingChannelInfo, isShow } = storeToRefs(
  useChannelInfoStore()
);

let typingAvt = ref("");
let channel_id = ref("");
typingAvt.value = "";

channelList.value.forEach((index) => {
  unread.value.push(0);
});

const ws = new WebSocket(
  `wss://ws.ghtk.vn/ws/chat?Authorization=${token}&appType=gchat&appVersion=2022-07-29%2C02%3A14%3A08&device=web&deviceId=zhXaUEkd5S0zxjrNPScW&source=chats`
);

ws.onopen = function () {
  ws.send(`${token}|sub|chats_user_6801990813180061667`);
};

onMounted(() => {
  ws.onmessage = function (event) {
    let message = JSON.parse(event.data);
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
      channel_id.value = message.data.channel_id;
      typingChannel.value = channel_id.value;
      if (currentChannel.value === message.data.channel_id) {
        typingAvt.value = message.data.sender.avatar;
        typingTest.value = true;
      }
      setTimeout(() => {
        typingAvt.value = "";
        typingTest.value = false;
        channel_id.value = "";
        typingChannel.value = channel_id.value;
      }, 5000);
    }
    // console.log(typingTest.value);
  };
});

async function scrollHandle(e) {
  const { target } = e;
  if (
    Math.ceil(-target.scrollTop) >=
      Math.ceil(target.scrollHeight - target.offsetHeight + 15) &&
    limit.value < 100 &&
    !loadingMore.value
  ) {
    limit.value += 10;
    await fetchMore({
      channel_id: currentChannel.value,
      limit: 40,
      before: messageList.value[messageList.value.length - 1].id,
    });
  }
}
</script>
;
