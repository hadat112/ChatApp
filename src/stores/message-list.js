import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: [],
      channelId: null,
      loading: false,
      error: null,
      limit: 40,
      token: "c_rgii1wpevgp2q4ftukxwxbgxu6iqhgoz8uxby0in0pufcstqezcbncloxefxmanm",
      url: `https://chat.ghtk.vn/api/v3/messages`
    }
  },
  actions: {
    async fetchMessage() {
      this.loading = true;
      const getUrl = this.url + `?channel_id=${this.channelId}&limit=${this.limit}`
      try {
        this.messageList = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => res.json())
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async sendMessage(messageInput, selecteFiles) {
      let formData = new FormData();
      formData.append('attachment', []);
      formData.append('channel_id', "1676242464193100389");
      formData.append('mentions', []);
      formData.append('msg_type', "text");
      formData.append('ref_id', "1Pq2InaSrMP696rGQza5");
      formData.append('text', "messageInput");

      await fetch("https://chat.ghtk.vn/api/v3/messages", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }).then(res => res.json())
        .catch(err => console.log(err));
      // await this.fetchMessage();
    }
  },
})