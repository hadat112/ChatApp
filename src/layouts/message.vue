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
export default {
 
}
</script>

<style>

.ant-layout-sider-children {
  background-color: #fff;
}

.ant-layout-sider{
    border-right: 2px solid #efefef;
}

ul.ant-list-items {
  padding: 0 6px;
}

li.ant-list-item {
  padding: 8px;
}

.ant-list-item-meta-avatar {
  justify-self: center;
  align-self: center;
}

.ant-layout-content {
  height: 100vh;
}


.header-channel-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 22px;
  font-weight: 700;
}

.channel-head {
  padding-left: 32px;
}

.channel-position {
  font-size: 16px;
  padding: 4px 0 0 8px;
  color: #828282;
}
</style>

