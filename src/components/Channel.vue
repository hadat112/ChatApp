<template>
  <div class="container">
    <div class="channel-input-search">
      <input type="text" placeholder="Tìm kiếm" />
    </div>
    <div class="channel-list-wrapper">
      <div v-for="(item, index) in channelList.data" :key="index" class="">
        <router-link :to="`${item.channel_id}`" class="channel-list-item" :class="{active: item.channel_id === $route.params.id}">
          <div class="channel-avatar-container">
            <div
              :style="`background-image: url(${
                item.channel_type === 'direct'
                  ? item.avatar
                  : item.author.avatar
              })`"
              class="channel-avatar"
            ></div>
          </div>
          <div class="channel-content">
            <div class="channel-name">
              {{ item.channel_name }}
            </div>
            <div class="channel-last-msg">
              <div class="channel-text">
                {{ item.last_message.text }}
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

<script>
import { useChannelStore } from "../stores/channel.js";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const { channelList } = storeToRefs(useChannelStore());
    const { fetchChannel } = useChannelStore();
    fetchChannel();

    function normalizeDate(number) {
      return number < 10 ? "0" + number : number;
    }

    function getTime(date) {
      let d = new Date(date);
      let today = new Date();
      let time;
      if (d.getDate() === today.getDate()) {
        time =
          normalizeDate(d.getHours()) + ":" + normalizeDate(d.getMinutes());
      } else {
        time =
          normalizeDate(d.getDate()) + "/" + normalizeDate(d.getMonth() + 1);
      }
      return time;
    }

    return {
      channelList,
      getTime,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.channel-list-wrapper {
  overflow-y: scroll;
  height: 80%;
  position: relative;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: transparent; 
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #E0DFDF;
}

.channel-list-item {
  display: flex;
  padding: 10px;
  border-top: 1px solid hsla(0,0%,91%,.4588235294117647);
}

.channel-list-item:hover {
  background-color: #F1FAFE;
}

.active {
  background-color: #E4F5FE;
}

.channel-avatar-container {
  min-width: 15%;
  max-width: 15%;
  height: 100%;
}

.channel-avatar {
  border-radius: 50%;
  height: 52px;
  width: 52px;
  background-size: cover;
  flex: 1;
}

.channel-content {
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  width: 85%;
}

.channel-name {
  color: #000;
  font-weight: 400;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.channel-last-msg {
  color: #666;
  display: flex;
  justify-content: space-between;
}

.channel-text {
  font-size: 14px;
  max-width: 180px;
  height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.channel-time {
  font-size: 13px;
}

.channel-input-search {
  margin: 0 8px 8px 8px;
  height: 44px;
}

.channel-input-search input {
  border: none;
  border-radius: 10px;
  background-color: #f4f4f4;
  height: inherit;
  padding: 8px;
  width: 100%;
}
</style>