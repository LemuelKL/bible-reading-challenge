import MyProgessVue from "@/views/MyProgess.vue";
import { createRouter, createWebHistory } from "vue-router";
import TodayView from "../views/TodayView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/today",
      alias: "/",
      name: "home",
      component: TodayView,
    },
    {
      path: "/my-progress",
      name: "my-progress",
      component: MyProgessVue,
    },
  ],
});

export default router;
