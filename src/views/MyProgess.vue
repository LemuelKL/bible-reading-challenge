<script setup lang="ts">
import { supabase } from "./../supabase";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
</script>

<template>
  {{ user.sbUser?.email }}

  <q-btn @click="supabase.auth.signOut()">Logout</q-btn>
</template>
