import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: []
    }
  },
  actions: {
    async fetchMessage(channelId, limit) {
      const token = "c_i0ld1hwqu6pwa8n8xo1qy2z1fjc9ucvnno0ebkqep9l7olihmt6so84mkwwyqnpq";
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