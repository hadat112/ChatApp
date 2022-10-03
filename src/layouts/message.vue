<template>
  <slot></slot>
  <a-layout style="min-height: 100vh">
    <a-layout-sider width="340px" class="channel-list">
      <slot name="sider"></slot>
    </a-layout-sider>
    <a-layout>
      <slot name="chat"></slot>
    </a-layout>
  </a-layout>
</template>

<script>
export default {};
</script>
