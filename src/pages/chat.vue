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
      {{ $route.params.id }}
    </div>
  </a-layout-content>
</template>

<script>
import { EllipsisOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    EllipsisOutlined,
  },
};
</script>