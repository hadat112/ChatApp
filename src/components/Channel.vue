<template>
<div class="container">

  <div class="input-search">
    <input type="text" placeholder="Tìm kiếm">
  </div>
  <div v-for="(item, index) in datas" :key="index" class="">
    <router-link :to="`${index}`" class="channel-list-item">
      <div class="channel-avatar">
      </div>
      <div class="channel-content">
        <div class="channel-name">
          {{item.title}}
        </div>
        <div class="channel-last-msg">
          <div class="channel-text">
            {{item.lastMessage}}
          </div>
          <div class="channel-time">
            13.58
          </div>
        </div>
      </div>
    </router-link>
  </div>   
</div>
</template>

<script>
import { defineComponent } from "vue";

export default {
  setup() {
    const datas = [
      {
        title: "Ant Design Title 1",
        lastMessage: "hello world"
      },
      {
        title: "Ant Design Title 2",
        lastMessage: "hello world"
      },
      {
        title: "Ant Design Title 3",
        lastMessage: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea delectus labore, ipsam velit culpa earum nesciunt quod ad veniam ullam explicabo deleniti dolorum repellendus. Temporibus in unde explicabo dolorum."
      },
      {
        title: "Ant Design Title 4",
        lastMessage: "fá"
      },
    ];
    return {
      datas,
    };
  },
};
</script>

<style scoped>
  .container { 
    width: 100%;
    padding: 0 6px;;
  }
  .channel-list-item {
    width: inherit;
    display: flex;
    padding: 8px;
  }

  .channel-avatar {
    border-radius: 50%;
    height: 52px;
    width: 52px;
    background-color: #666;
  }

  .channel-content {
    display: flex;
    padding-left: 8px;
    flex-direction: column;
    width: 85%;
  }

  .channel-name {
    font-weight: 400;
    font-size: 16px;
  }

  .channel-last-msg {
    color: #666;
    display: flex;
    justify-content: space-between;
  }
  
  .channel-text {
    font-size: 14px;
    max-width: 200px;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .channel-time {
    font-size: 13px;
  }


  .input-search {
    margin: 0 8px;
    height: 44px
  }

  .input-search input {
    width: 100%;
    border: none;
    border-radius: 10px;
    background-color: #F4F4F4;
    height: inherit;
  }


</style>