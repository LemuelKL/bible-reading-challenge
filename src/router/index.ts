import ReadingView from '@/views/ReadingView.vue';
import LeaderboardView from '@/views/LeaderboardView.vue';
import MyProgessView from '@/views/MyProgessView.vue';
import SettingsView from '@/views/SettingsView.vue';
import HelpViewVue from '@/views/HelpView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/reading'
    },
    {
      path: '/reading/:book?/:chapter?',
      name: 'reading',
      component: ReadingView
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
    },
    {
      path: '/help',
      name: 'help',
      component: HelpViewVue
    }
  ]
});

export default router;
