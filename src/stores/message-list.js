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
      const token = "c_1coyfcasrqwoxgxt6o2c714pybl4rz3bivuoc0klcgmgpumric5tj4kjquxz95pn";
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
        console.log(this.messageList.data);
      }
    },
  },
})