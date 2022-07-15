<template>
  <div class="container">
    <div class="channel-input-search">
      <input type="text" placeholder="Tìm kiếm" />
    </div>
    <div class="channel-list-wrapper" :class="{loading: loading}">
      <div v-for="(item, index) in channelList.data" :key="index" class="">
        <router-link :to="`${item.channel_id}`" :key="$route.fullPath" class="channel-list-item" :class="{active: item.channel_id === $route.params.id}">
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
    const { channelList, loading, error } = storeToRefs(useChannelStore());
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
    console.log(channelList.value.data)
    return {
      channelList,
      getTime,
      error,
      loading
    };
  },
};
</script>
