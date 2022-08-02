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
            const token = "c_xlivsz550natcyrsmdjh25q6vz5zkf1cc7m4bjbygnq25qqhwhdldv4dvtdqvwot";
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
            // console.log(this.channel_id);s
        },
      },
})