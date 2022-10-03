<script setup>
import { EllipsisOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { useChannelInfoStore } from "@/stores/channel-info.js";
import { computed } from "vue";

const { channelInfoList, isShow } = storeToRefs(useChannelInfoStore());

const isDirect = computed(() => {
  channelInfoList && channelInfoList.channel_type === "direct";
});

console.log(channelInfoList);

const showInfo = () => {
  isShow.value = !isShow.value;
};
</script>

<template>
  <!-- header -->
  <a-page-header
    v-if="channelInfoList"
    :title="`${channelInfoList.channel_name}`"
    :sub-title="`${
      isDirect
        ? channelInfoList.partner?.position_name
        : channelInfoList.count_member + ' thành viên'
    }`"
  >
    <template #extra>
      <button @click="showInfo">
        <ellipsis-outlined />
      </button>
    </template>
  </a-page-header>
  <div class="channel-info-btn"></div>
</template>

<style scoped>
button {
  background: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 28px;
  color: #a4a4a4;
}
</style>
