import { createRouter, createWebHistory } from "vue-router";
import { useChannelInfoStore } from "../stores/channel-info";
import { useMessageStore } from "../stores/message-list";
import { MainLayout } from "../shared";

const routes = [
  {
    path: "",
    name: "layout",
    meta: { layout: "default" },
    component: MainLayout,
    children: [
      {
        path: "/:id?",
        name: "chat",
        component: () => import("@/pages/chat.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const msgStore = useMessageStore();
  const channelInfoStore = useChannelInfoStore();
  msgStore.currentChannel = to.params.id;
  msgStore.limit = 40;
  msgStore.fetchMessage({ channel_id: to.params.id, limit: 40 });
  channelInfoStore.fetchChannelInfo({ channel_id: to.params.id });
  next();
});

export default router;
