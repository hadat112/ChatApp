import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: []
    }
  },
  actions: {
    async fetchMessage(channelId, limit) {
      const token = "c_7zztqncs4bzvhroma4ejigr9hwmbx4xgn2riwlwa2igq3oww0wtsz1wvnwvkkdx1";
      const url = `https://chat.ghtk.vn/api/v3/messages?channel_id=${channelId}&limit=${limit}`
      this.messageList = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
    },
  },
})