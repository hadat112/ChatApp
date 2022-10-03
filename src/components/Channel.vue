<template>
  <div class="container">
    <div class="channel-input-search">
      <input type="text" placeholder="Tìm kiếm" />
    </div>
    <div class="channel-tool">
      <div class="channel-tool-create"><plus-outlined />Chats</div>
      <div class="channel-tool-actions">Thao tác</div>
    </div>
    <div class="channel-list-wrapper" :class="{}">
      <div v-for="(item, index) in channelList" :key="index" class="">
        <router-link
          :to="item.channel_id"
          :key="$route.fullPath"
          class="channel-list-item"
          :class="{
            active: item.channel_id === $route.params.id,
            channel_item__unread: unread[index],
          }"
        >
          <div class="channel-avatar-container">
            <div class="channel-avatar" style="transform: rotate(45deg)">
              <div
                class="channel-avatar avatar"
                v-if="item.channel_type === 'direct'"
                :style="`background-image: url(${item.avatar})`"
              ></div>
              <div
                class="avatar-group"
                v-if="item.channel_type === 'group' && item.group_images"
              >
                <span class="channel-avatar avatar group">
                  <img
                    :src="`${item.group_images[0].avatar}`"
                    alt="avatar-channel"
                  />
                </span>
                <span class="channel-avatar avatar group">
                  <img
                    :src="`${item.group_images[1].avatar}`"
                    alt="avatar-channel"
                  />
                </span>
              </div>
              <div
                v-else
                class="channel-avatar avatar"
              ></div>
            </div>
          </div>
          <div class="channel-content">
            <div class="channel-title">
              <div class="channel-name">
                {{ item.channel_name }}
              </div>
              <div v-if="unread[index]" class="channel-title__more">
                <a-badge :count="unread[index]" />
              </div>
            </div>
            <div class="channel-last-msg">
              <div
                class="typing-channel"
                v-if="item.channel_id == typingChannel"
              >
                <img
                  class="item-channel__typing"
                  src="https://ghtk.me/images/dots.gif"
                  alt="Dot"
                />
                đang soạn tin
              </div>
              <div class="channel-text" v-else>
                <span v-if="item.channel_type === 'group'">
                  {{
                    item.last_message.sender.fullname.split(" ")[
                      item.last_message.sender.fullname.split(" ").length - 1
                    ]
                  }}:&nbsp;
                </span>
                <p
                  style="display: inline-block"
                  v-if="item.last_message.text"
                  v-html="markedText(item.last_message.text)"
                ></p>
                <p
                  v-else-if="
                    item.last_message &&
                    item.last_message?.attachments &&
                    item.last_message.attachments.length &&
                    (item.last_message?.attachments[0].ext === 'jpg' ||
                      item.last_message?.attachments[0].ext === 'png')
                  "
                >
                  <camera-filled /> ảnh
                </p>
                <p
                  v-else-if="
                    item.last_message &&
                    item.last_message?.attachments &&
                    item.last_message.attachments.length &&
                    item.last_message?.attachments[0].ext === 'mp4'
                  "
                >
                  <video-camera-filled /> video
                </p>
              </div>

              <div class="channel-time">
                {{ getTime(item.last_message.created_at) }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import {
  PlusOutlined,
  CameraFilled,
  VideoCameraFilled,
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";

const { channelList, unread, loadingChannel, typingChannel } = storeToRefs(
  useMessageStore()
);

const { fetchChannel } = useMessageStore();

fetchChannel({ tag_id: "930203%2C930205", group_id: 1, limit: 40 });

function normalizeDate(number) {
  return number < 10 ? "0" + number : number;
}

function getTime(date) {
  let d = new Date(date);
  let today = new Date();
  let time;
  if (d.getDate() === today.getDate()) {
    time = normalizeDate(d.getHours()) + ":" + normalizeDate(d.getMinutes());
  } else {
    time = normalizeDate(d.getDate()) + "/" + normalizeDate(d.getMonth() + 1);
  }
  return time;
}
</script>

<style>
img {
  vertical-align: middle;
  border-style: none;
}

.item-channel__typing {
  width: 38px;
}
</style>
