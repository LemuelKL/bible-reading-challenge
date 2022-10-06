<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue';
import { useQuasar, LocalStorage } from 'quasar';
const $q = useQuasar();

function toggleDarkMode() {
  $q.dark.toggle();
  LocalStorage.set('darkMode', $q.dark.isActive);
}
</script>

<template>
  <div class="column q-gutter-md">
    <UserProfile />
    <q-toggle
      :model-value="$q.dark.isActive"
      @update:model-value="toggleDarkMode"
      label="黑暗模式"></q-toggle>
  </div>
</template>
