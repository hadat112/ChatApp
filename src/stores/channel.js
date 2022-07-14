import { defineStore } from 'pinia'

export const useChannelStore = defineStore('channels', {
    state: () => {
        return {
          channelList: [],
        }
      },
      actions: {
        async fetchChannel() {
            const token = "c_4oitiv5n7pp5zzzhnmlzn0hysormz7odwddujlrw2xbt2dhr8rddzsyjcbnlwllj";
            const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=40"
            this. channelList = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
        },
      },
})