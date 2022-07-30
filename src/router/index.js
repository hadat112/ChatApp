import { createRouter, createWebHistory } from "vue-router";
import { useChannelInfoStore } from "../stores/channel-info";
import { useMessageStore } from "../stores/message-list";

const routes = [
    {
      path: "/:id?",
      name: "chat",
      component: () =>
        import( "../pages/chat.vue"),
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    const msgStore = useMessageStore();
    msgStore.currentChannel = to.params.id
    msgStore.before = from.params.id
    msgStore.limit = 20;
    msgStore.fetchMessage();

    const channelInfoStore = useChannelInfoStore();
    channelInfoStore.fetchChannelInfo(to.params.id);

    next();
  })

export default router;