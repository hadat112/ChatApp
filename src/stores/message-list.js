import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: [],
      loading: false,
      error: null
    }
  },
  actions: {
    async fetchMessage(channelId, limit) {
      this.loading = true;
      const token = "c_4oitiv5n7pp5zzzhnmlzn0hysormz7odwddujlrw2xbt2dhr8rddzsyjcbnlwllj";
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