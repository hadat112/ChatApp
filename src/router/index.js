import { createRouter, createWebHistory } from "vue-router";
import { useMessageStore } from "../stores/message-list";

const routes = [
    {
      path: "/:id?",
      name: "home",
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
    store.fetchMessage(to.params.id, 40);
    next();
  })

export default router;