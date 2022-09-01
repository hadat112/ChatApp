import { defineStore } from 'pinia'
import { channelService } from '../services/channelService'

export const useChannelInfoStore = defineStore('channelInfo', {
    state: () => {
        return {
          channelInfoList: [],
          loadingChannelInfo: false,
          isShow: true
        }
      },
      actions: {
        
        async fetchChannelInfo(params) {
          this.loadingChannelInfo = true 

          const channelInfo = await channelService.getChannelInfo(params);

          this.channelInfoList = channelInfo;
          this.loadingChannelInfo = false;
        },
      },
})