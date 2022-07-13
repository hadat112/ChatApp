<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-page-header
      backIcon=""
      style="border: 1px solid rgb(235, 237, 240)"
      title="Hà Đạt"
      sub-title="Web engineer"
    >
      <template #extra>
        <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
      </template>
    </a-page-header>
    <div class="channel-info-btn"></div>
  </a-layout-header>
  <a-layout-content>
    <div :style="{ padding: '24px', background: '#fff', height: '100vh' }">
    <div class="message-container" v-for="(item, index) in messageList.data" :key="index">
      <div class="message-avt-container">
        <div class="message-avt" :style="`background-image: url(${
                item.sender.avatar
              })`"></div>
      </div>
      <div class="message-content">
        <div class="message-sender">
          {{item.sender.fullname}}
        </div>
        <div class="message-text" >
          {{item.text}}
        </div>
      </div>
    </div>
    </div>
  </a-layout-content>
</template>

<script>
import { EllipsisOutlined } from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

export default {
  components: {
    EllipsisOutlined,
  },
  setup() {
    const route = useRoute();
    const { messageList } = storeToRefs(useMessageStore());
    const { fetchMessage } = useMessageStore();
    let channelID = route.params.id;
    fetchMessage(channelID, 40);
    return {messageList}
  }
};
</script>

<style scoped>
.message-container{
  display: flex;
}
.message-avt {
  border-radius: 50%;
  height: 35px;
  width: 35px;
  background-size: cover;
  background-color: aqua;
  flex: 1;
}
.message-content {
  width: 60%;
  margin: 2px 0 0 8px ;

}

.message-text {
  background-color: #F0EFF4;
  border-radius: 10px;
  padding: 6px 12px;
  width: fit-content;
  word-wrap: break-word;
}
</style>