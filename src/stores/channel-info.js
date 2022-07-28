import { defineStore } from 'pinia'

export const useChannelInfoStore = defineStore('channelInfo', {
    state: () => {
        return {
          channelInfoList: [],
          loadingChannelInfo: false
        }
      },
      actions: {
        async fetchChannelInfo(channelId) {
          this.loadingChannelInfo = true;
            const token = "c_bstkixaqbbom7ajaa5j8wn64px31tzmm8zilmj9anlh64rsiuxeketusxye3ri6c";
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