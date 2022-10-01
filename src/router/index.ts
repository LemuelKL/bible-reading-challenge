import MyProgessView from '@/views/MyProgessView.vue';
import LeaderboardView from '@/views/LeaderboardView.vue';
import TodayView from '@/views/TodayView.vue';
import SettingsView from '@/views/SettingsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/today',
      alias: '/',
      name: 'home',
      component: TodayView
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView
    },
    {
      path: '/my-progress',
      name: 'my-progress',
      component: MyProgessView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
});

export default router;
