<script lang="ts" setup>
import { useQuasar, LocalStorage } from 'quasar';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { supabase } from './supabase';
import { useUserStore } from './stores/user';
import SBAuth from './components/SBAuth.vue';
import type { AuthChangeEvent, Session } from '@supabase/gotrue-js';
import ReadingControl from './components/ReadingControl.vue';
import { useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
const bible = useBibleStore();
const { targetReadings, readCount } = storeToRefs(bible);

const router = useRouter();
const route = useRoute();

const menuList = [
  {
    icon: 'play_lesson',
    label: '經文閲讀',
    path: '/reading',
    separator: true
  },
  {
    icon: 'leaderboard',
    label: '排行榜',
    path: '/leaderboard',
    separator: false
  },
  {
    icon: 'view_list',
    label: '我的進度',
    path: '/my-progress',
    separator: true
  },
  {
    icon: 'settings',
    label: '設定',
    path: '/settings',
    separator: false
  },
  {
    icon: 'help',
    label: '幫助',
    path: '/help',
    separator: false
  }
];

const drawer = ref(false);

const user = useUserStore();
user.sbUser = supabase.auth.user();
supabase.auth.onAuthStateChange(
  (event: AuthChangeEvent, session: Session | null) => {
    user.sbUser = session?.user;

    if (event === 'SIGNED_IN') {
      supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('id', user.sbUser?.id)
        .then(
          (res) => {
            if (res.error) {
              console.log(res.error);
            } else {
              user.sbProfile = res.data[0];
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
);

const $q = useQuasar();
$q.dark.set(LocalStorage.getItem('darkMode') || false);
</script>

<template>
  <main>
    <div class="q-pa-none" v-if="user.sbUser">
      <q-layout view="hHh Lpr lff" style="height: 100vh" class="shadow-2">
        <q-header
          elevated
          class="row"
          style="
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -o-user-select: none;
          ">
          <q-toolbar class="col bg-black">
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title class="mobile-hide">
              1189 Challenge
            </q-toolbar-title>
            <q-space />
            <ReadingControl v-if="route.name === 'reading'" />
            <q-toolbar-title v-if="route.name === 'my-progress'" align="right">
              {{ readCount }} / {{ targetReadings }}
            </q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-drawer
          v-model="drawer"
          show-if-above
          :width="180"
          :breakpoint="500"
          bordered>
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                @click="router.push(menuItem.path)"
                :active="menuItem.label === 'Outbox'"
                v-ripple="true">
                <q-item-section avatar>
                  <q-icon
                    :name="menuItem.icon"
                    :color="menuItem.path === route.path ? 'primary' : ''" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-drawer>

        <q-page-container>
          <q-page class="row no-wrap">
            <div class="col">
              <div class="column full-height">
                <q-scroll-area class="col q-pa-sm">
                  <RouterView />
                </q-scroll-area>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <div v-else><SBAuth /></div>
  </main>
</template>
