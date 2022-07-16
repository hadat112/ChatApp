import { defineStore } from 'pinia'

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
            const token = "c_1coyfcasrqwoxgxt6o2c714pybl4rz3bivuoc0klcgmgpumric5tj4kjquxz95pn";
            const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=40"
            this. channelList = await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .catch((err) => this.error= err)
              .finally(() => this.loading = false);
        },
      },
})