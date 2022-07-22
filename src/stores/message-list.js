import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: []
    }
  },
  actions: {
    async fetchMessage(channelId, limit) {
      const token = "c_dorde02ctke00y7bqpe1ojqmzemtyfekb96zkyxkob86k2tlp5xvifbxrko5uopa";
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