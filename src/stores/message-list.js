import { defineStore } from "pinia";
import { messageService } from "../services/messageService";
import { channelService } from "../services/channelService";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      channelList: [],
      unread: [],
      typingTest: false,
      loadingChannel: false,
      errorChannel: null,
      messageList: [],
      currentChannel: null,
      typingChannel: null,
      loading: false,
      loadingMore: false,
      error: null,
      limit: 40,
      token:
        "c_v1g5s7vn8hilt4371lbpisrzhogsl0lmmtxod4c7pavnukclwdjt21irjrvda9le",
    };
  },
  actions: {
    async fetchMessage(params) {
      this.loading = true;
      const messages = await messageService.getMessageList(params);
      this.loading = false;
      this.messageList = messages || [];
    },

    async fetchMore(params) {
      this.loading = true;
      const messages = await messageService.getMessageList(params);
      this.loading = false;
      this.messageList.push(...messages);
      console.log(messages);
    },

    async fetchChannel(params) {
      this.loadingChannel = true;
      const channel = await channelService.getChannelList(params);
      this.loadingChannel = false;
      this.channelList = channel || [];
    },

    async fetchNewChannel(params) {
      this.loadingChannel = true;
      const channel = await channelService.getChannelList(params);
      this.loadingChannel = false;
      this.channelList.unshift(...channel.data);
    },
  },
});
