import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: []
    }
  },
  actions: {
    async fetchMessage(channelId, limit) {
      const token = "c_veoam5nqf2gvhduvt8vbebajswxfxfaa1kvateqllmmotmtdrvb7ufpms8e1foqw";
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