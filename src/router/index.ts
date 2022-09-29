import MyProgess from "@/views/MyProgess.vue";
import TodayView from "@/views/TodayView.vue";
import SettingsView from "@/views/SettingsView.vue";
import { createRouter, createWebHistory } from "vue-router";

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
      component: MyProgess,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
  ],
});

export default router;
