import { defineStore } from 'pinia'

export const useChannelStore = defineStore('channels', {
    state: () => {
        return {
          channelList: [],
        }
      },
      actions: {
        async fetchChannel() {
            const token = "c_7zztqncs4bzvhroma4ejigr9hwmbx4xgn2riwlwa2igq3oww0wtsz1wvnwvkkdx1";
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