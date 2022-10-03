<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider width="340px" class="channel-list">
      <Sidebar />
    </a-layout-sider>
    <a-layout style="flex-direction: column">
      <a-layout-header
        style="background: #fff; height: fit-content; padding: 0"
      >
        <Header></Header>
      </a-layout-header>
      <a-layout-content id="layout-content">
        <router-view />
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Sidebar from "./components/Sidebar/index.vue";
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
</script>
