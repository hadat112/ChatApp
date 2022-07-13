import { defineStore } from 'pinia'

export const useChannelStore = defineStore('channels', {
    state: () => {
        return {
          channelList: [],
        }
      },
      actions: {
        async fetchChannel() {
            const token = "c_i0ld1hwqu6pwa8n8xo1qy2z1fjc9ucvnno0ebkqep9l7olihmt6so84mkwwyqnpq";
            const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=40"
            this. channelList = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
            // console.log(this.channelList);
        },
      },
})