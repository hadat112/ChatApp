import { createRouter, createWebHistory } from "vue-router";
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
    const store = useMessageStore();
    store.limit = 40;
    store.channelId = to.params.id;
    store.fetchMessage();
    next();
  })

export default router;