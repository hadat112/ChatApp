import { defineStore } from 'pinia'

export const useChannelInfoStore = defineStore('channelInfo', {
    state: () => {
        return {
          channelInfoList: [],
        }
      },
      actions: {
        async fetchChannelInfo(channelId) {
            const token = "c_2was5vgocccferhuqkpwnazegzjroeai1mnz6tppbfnbsclq0uwp7eis23meonyy";
            const url = `https://chat.ghtk.vn/api/v3/channels/info?channel_id=${channelId}`
            this.channelInfoList = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
            // console.log(this.channelInfoList);
            // console.log(this.channel_id);

        },
      },
})