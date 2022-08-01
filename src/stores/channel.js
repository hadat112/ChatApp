import { message } from 'ant-design-vue';
import { defineStore, storeToRefs } from 'pinia'
import { useMessageStore } from './message-list';

export const useChannelStore = defineStore('channels', {
    state: () => {
        return {
          channelList: [],
          loading: false,
          error: null
        }
      },
      actions: {
        async fetchChannel() {
          this.loading = true;
            const token = "c_z3ndox4lnsebfwn5dgofz9lfzjjhx2xrjxlfx7iyajostsqhqwj35yweypfltlfn";
            const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=40"
             let channel = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .catch((err) => this.error= err)
              .finally(() => this.loading = false);
              this.channelList = channel.data
        },

        async fetchNewChannel() {          
          this.loading = true;
            const token = "c_z3ndox4lnsebfwn5dgofz9lfzjjhx2xrjxlfx7iyajostsqhqwj35yweypfltlfn";
            const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=1"
             let channel = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .catch((err) => this.error= err)
              .finally(() => this.loading = false);
              this.channelList.unshift(...channel.data)
        },
      },
})