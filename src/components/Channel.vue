<template>
  <div class="container">
    <div class="channel-input-search">
      <input type="text" placeholder="Tìm kiếm" />
    </div>
    <div class="channel-tool">
      <div class="channel-tool-create"><plus-outlined />Chats</div>
      <div class="channel-tool-actions">Thao tác</div>
    </div>
    <div class="channel-list-wrapper" :class="{ loading: loading }">
      <div v-for="(item, index) in channelList.data" :key="index" class="">
        <router-link
          :to="`${item.channel_id}`"
          :key="$route.fullPath"
          class="channel-list-item"
          :class="{ active: item.channel_id === $route.params.id }"
        >
          <div class="channel-avatar-container">
            <div class="channel-avatar" style="transform: rotate(45deg)">
              <div
                class="channel-avatar avatar"
                v-if="item.channel_type === 'direct'"
                :style="`background-image: url(${item.avatar})`"
              ></div>
              <div class="avatar-group" v-if="item.channel_type === 'group'">
                <span class="channel-avatar avatar group">
                  <img :src="`${item.group_images[0].avatar}`" alt="avatar-channel" />
                </span>
                <span class="channel-avatar avatar group">
                  <img :src="`${item.group_images[1].avatar}`" alt="avatar-channel" />
                </span>
              </div>
            </div>
          </div>
          <div class="channel-content">
            <div class="channel-name">
              {{ item.channel_name }}
            </div>
            <div class="channel-last-msg">
              <div class="channel-text">
                <span v-if="item.channel_type === 'group'">
                  {{
                    item.last_message.sender.fullname.split(" ")[
                      item.last_message.sender.fullname.split(" ").length - 1
                    ]
                  }}:&nbsp;
                </span>
                <p
                  style="display: inline-block"
                  v-html="urlify(item.last_message.text)"
                ></p>
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
import { useChannelInfoStore } from "../stores/channel-info.js";
import { storeToRefs } from "pinia";
import { PlusOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    PlusOutlined,
  },
  setup() {
    const { channelList, loading, error } = storeToRefs(useChannelStore());
    const { channelInfo, channelInfoLoading } = storeToRefs(
      useChannelInfoStore()
    );
    const { fetchChannel } = useChannelStore();
    const { fetchChannelInfo } = useChannelInfoStore();
    fetchChannel();

    console.log(channelList.value);

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
      error,
      loading,
      urlify,
      channelInfo,
      channelInfoLoading,
    };
  },
};
</script>
