import { defineStore } from 'pinia'

export const useChannelInfoStore = defineStore('channelInfo', {
    state: () => {
        return {
          channelInfoList: [],
        }
      },
      actions: {
        async fetchChannelInfo(channelId) {
            const token = "c_dorde02ctke00y7bqpe1ojqmzemtyfekb96zkyxkob86k2tlp5xvifbxrko5uopa";
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