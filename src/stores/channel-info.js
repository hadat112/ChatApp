import { defineStore } from 'pinia'

export const useChannelInfoStore = defineStore('channelInfo', {
    state: () => {
        return {
          channelInfoList: [],
          loadingChannelInfo: false,
          isShow: true
        }
      },
      actions: {
        async fetchChannelInfo(channelId) {
          this.loadingChannelInfo = true;
            const token = "c_zc6nzm9t9lenhjproux5hkahs6uobxm6v1kiga6v9xxw9o7yquprzgojwcek5uu7";
            const url = `https://chat.ghtk.vn/api/v3/channels/info?channel_id=${channelId}`
            try {
              this.channelInfoList = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((res) => res.json())
            } catch (err) {
              this.error = err;
            } finally {
              this.loadingChannelInfo = false;
            }
            // console.log(this.channelInfoList);
            // console.log(this.channel_id);
        },
      },
})