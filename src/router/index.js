import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
      path: "/:id?",
      name: "home",
      component: () =>
        import( "../pages/chat.vue")
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;