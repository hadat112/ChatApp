import { createRouter, createWebHistory } from "vue-router";
import { useChannelInfoStore } from "../stores/channel-info";
import { useMessageStore } from "../stores/message-list";

const routes = [
  {
    path: "/:id?",
    name: "chat",
    component: () =>
      import("../pages/chat.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.params.id) {
    const msgStore = useMessageStore();
    const channelInfoStore = useChannelInfoStore();
    msgStore.currentChannel = to.params.id
    msgStore.before = from.params.id
    msgStore.limit = 40;

    msgStore.fetchMessage();
    channelInfoStore.fetchChannelInfo(to.params.id);

    next();
  }
})

export default router;