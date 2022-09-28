<script lang="ts" setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import { supabase } from "./supabase";
import { useUserStore } from "./stores/user";
import SBAuthVue from "./components/SBAuth.vue";

const menuList = [
  {
    icon: "today",
    label: "Today",
    path: "/today",
    separator: true,
  },
  {
    icon: "leaderboard",
    label: "Leaderboard",
    path: "/leaderboard",
    separator: false,
  },
  {
    icon: "view_list",
    label: "My Progress",
    path: "/my-progress",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    path: "/settings",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    path: "/help",
    separator: false,
  },
];

const drawer = ref(false);

const user = useUserStore();
user.sbUser = supabase.auth.user();
supabase.auth.onAuthStateChange((_event: any, session) => {
  user.sbUser = session?.user;
});
</script>

<template>
  <main>
    <div class="q-pa-none" v-if="user.sbUser">
      <q-layout
        view="hHh Lpr lff"
        container
        style="height: 100vh"
        class="shadow-2"
      >
        <q-header elevated class="bg-black">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Home</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-drawer
          v-model="drawer"
          show-if-above
          :width="200"
          :breakpoint="500"
          bordered
          class="bg-grey-3"
        >
          <q-scroll-area class="fit">
            <q-list>
              <template v-for="(menuItem, index) in menuList" :key="index">
                <q-item
                  clickable
                  @click="$router.push(menuItem.path)"
                  :active="menuItem.label === 'Outbox'"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon :name="menuItem.icon" />
                  </q-item-section>
                  <q-item-section>
                    {{ menuItem.label }}
                  </q-item-section>
                </q-item>
                <q-separator :key="'sep' + index" v-if="menuItem.separator" />
              </template>
            </q-list>
          </q-scroll-area>
        </q-drawer>

        <q-page-container>
          <q-page padding> <RouterView></RouterView> </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <div v-else><SBAuthVue /></div>
  </main>
</template>
