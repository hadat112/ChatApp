import { defineStore } from 'pinia'

export const useStore = defineStore('channel-list', {
    state: () => {
        return {
          channelList: []
        }
      },
      actions: {
        async fetchUserPreferences() {
            const token = "c_wvqi7mvtcvzadakaegued887gmpa8xw37ll4sufkss615rhktbitpamhrdjllz6r";
            const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=40"
            await fetch(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((json) => this.channelList=json.data);
            console.log(this.channelList);
        },
      },
})