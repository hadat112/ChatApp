import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: [],
      channelInfo: {},
      loading: false,
      error: null
    }
  },
  actions: {
    async fetchMessage(channelId, limit) {
      this.loading = true;
      const token = "c_eip3qnbd2tokbneqreco54knf6cb21ojuc3q6ahsewb3dioydeigapzuln5ztwfn";
      const url1 = `https://chat.ghtk.vn/api/v3/channels/info?channel_id=${channelId}`
      const url = `https://chat.ghtk.vn/api/v3/messages?channel_id=${channelId}&limit=${limit}`
      try {
        this.messageList = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
      } catch(err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
})