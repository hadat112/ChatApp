import { message } from 'ant-design-vue';
import { defineStore } from 'pinia'
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
          const messageStore = useMessageStore();
          
          this.loading = true;
            const token = "c_w7t3uynrn9ekd2mor8oasahmlhqagauhgzubek8jwt1hi89fnrb2ho9f6zt0unrj";
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
              messageStore.currentChannel = this.channelList[0].channel_id;
        },
      },
})