<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
</script>

<template>
  <div class="column q-gutter-md">
    <UserProfile />
    <q-toggle
      :model-value="$q.dark.isActive"
      @update:model-value="$q.dark.set(!$q.dark.isActive)"
      label="Dark Mode"></q-toggle>
  </div>
</template>
