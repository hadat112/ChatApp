import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: [],
      currentChannel: null,
      loading: false,
      error: null,
      limit: 40,
      token: "c_0jlvkoo7gaagtlorhivimika0lpnmaysyfh8jxfjqottwcgigrt3cmiaf6afmab4" 
    }
  },
  actions: {
    async fetchMessage() {
      this.loading = true;
      const url = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&limit=${this.limit}`
      try {
        this.messageList = await fetch(url, {
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
      // let formData = new FormData();
      // formData.append('attachment', []);
      // formData.append('channel_id', "1676242464193100389");
      // formData.append('mentions', []);
      // formData.append('msg_type', "text");
      // formData.append('ref_id', "1Pq2InaSrMP696rGQza5");
      // formData.append('text', "messageInput");

      const data = {
        attachment: [],
        channel_id: `${this.currentChannel}`,
        mentions: [],
        msg_type: "text",
        ref_id: "1Pq2InPErMP696rGQza5",
        text: `${messageInput}`,
      }

      await fetch("https://chat.ghtk.vn/api/v3/messages", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .catch(err => console.log(err));
      await this.fetchMessage();
    }
  },
})