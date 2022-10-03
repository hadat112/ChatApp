<script setup>
import Channel from "../../../../components/Channel.vue";
import { BellOutlined, MenuOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <div class="header-channel-list">
    <div class="">
      <menu-outlined />
      <span style="margin-left: 16px">Chat nội bộ</span>
    </div>
    <bell-outlined style="font-size: 20px; color: #009149"></bell-outlined>
  </div>
  <channel></channel>
</template>
