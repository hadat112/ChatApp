import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      messageList: [],
      currentChannel: null,
      loading: false,
      loadingMore: false,
      error: null,
      limit: 20,
      before: 0,
      token: "c_2was5vgocccferhuqkpwnazegzjroeai1mnz6tppbfnbsclq0uwp7eis23meonyy"
    }
  },
  actions: {
    async fetchMessage() {
      this.loading = true;

      const url1 = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&before=${this.before}&limit=${this.limit}`
      const url = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&limit=${this.limit}`
      try {
        let messages = await fetch(url1, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => res.json())
        // let removefirst = messages.data.splice(0, messages.data.length - 40);
        this.messageList = messages.data
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchMore() {
      this.loadingMore = true;
      let messages
      const url1 = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&before=${this.before}&limit=${this.limit}`
      const url = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&limit=${this.limit}`
      try {
        messages= await fetch(url1, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => res.json())
          } catch (err) {
            this.error = err;
          } finally {
            this.loadingMore = false;
          }
          // console.log(messages)
          if(messages.data.length)  {let removefirst = messages.data.splice(0, 40)};
          this.messageList.push(...messages.data)
      // console.log(this.messageList.length)
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