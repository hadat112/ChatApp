import { defineStore } from 'pinia'
import axios from 'axios';

export const useMessageStore = defineStore('messages', {
  state: () => {
    return {
      channelList: [],
      unread: [],
      loadingChannel: false,
      errorChannel: null,
      messageList: [],
      currentChannel: null,
      loading: false,
      loadingMore: false,
      error: null,
      limit: 40,
      before: 0,
      token: "c_zixa9mmy4flin2kzoxjamkjltb6fwdpfeuofwwqzpl1xy56eb9qbror1dsgdv2fu"
    }
  },
  actions: {
    async fetchMessage() {
      this.loading = true;

      const url1 = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&before=${this.before}&limit=${this.limit}`;
      const url = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&limit=${this.limit}`
      // const socket = io(url1)
      // console.log(socket);
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
      // console.log(this.messageList);
    },

    async fetchNewMessage() {
      const url1 = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&before=${this.before}&limit=1`;
      // const socket = io(url1)
      // console.log(socket);
      try {
        let messages = await fetch(url1, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => res.json())
        // let removefirst = messages.data.splice(0, messages.data.length - 40);
        this.messageList.unshift(...messages.data);
        console.log(messagesList);
      } catch (err) {
        this.error = err;
      }
      // console.log(this.messageList);
    },

    async fetchMore() {
      this.loadingMore = true;
      let messages
      const url1 = `https://chat.ghtk.vn/api/v3/messages?channel_id=${this.currentChannel}&before=${this.before}&limit=${this.limit}`
      try {
        messages = await fetch(url1, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((res) => res.json())
        if (messages.data.length) { let removefirst = messages.data.splice(0, 40) };
        this.messageList.push(...messages.data)
        // let removefirst = messages.data.splice(0, messages.data.length - 40);
        this.messageList = messages.data
      } catch (err) {
        this.error = err;
      } finally {
        this.loadingMore = false;
      }
    },

    async sendMessage(messageInput, selecteFiles) {
      let formData = new FormData();
      selecteFiles.forEach(file => {
        formData.append('attachment', file);
      });
      formData.append('channel_id', this.currentChannel);
      formData.append('msg_type', "text");
      formData.append('ref_id', "1Pq2InaSrMP696rGQza5");
      formData.append('text', messageInput);

      await axios.post('https://chat.ghtk.vn/api/v3/messages', formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      // this.fetchNewMessage();
    },
    
    async fetchChannel() {
      this.loadingChannel = true;
      const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=40"
      let channel = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => this.errorChannel = err)
        .finally(() => this.loadingChannel = false);
      this.channelList = channel.data
    },

    async fetchNewChannel() {
      this.loadingChannel = true;
      const url = "https://chat.ghtk.vn/api/v3/channels?tag_id=930203%2C930205&group_id=1&limit=1"
      let channel = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => this.errorChannel = err)
        .finally(() => this.loadingChannel = false);
      this.channelList.unshift(...channel.data)
    },
  },
},
)