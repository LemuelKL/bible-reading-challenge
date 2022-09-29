<script setup lang="ts">
import { supabase } from "../supabase";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const user = useUserStore();

const { sbProfile } = storeToRefs(user);

const updateProfile = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: sbProfile.value?.first_name,
      last_name: sbProfile.value?.last_name,
    })
    .match({ id: sbProfile.value?.id });
};
</script>

<template>
  <q-card>
    <q-card-section class="row justify-between">
      <div class="text-h5">My Profile</div>
      <q-space></q-space>
      <q-btn outline @click="supabase.auth.signOut()"> Logout </q-btn>
    </q-card-section>
    <q-separator inset />
    <q-card-section class="q-gutter-xs" v-if="sbProfile">
      <q-input standout :model-value="user.sbUser?.email" dense readonly />

      <q-input
        outlined
        dense
        v-model="sbProfile.first_name"
        placeholder="First name"
      ></q-input>
      <q-input
        outlined
        dense
        v-model="sbProfile.last_name"
        placeholder="Last name"
      ></q-input>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn outline color="primary" @click="updateProfile"
        >Upadte Profile</q-btn
      >
    </q-card-actions>
  </q-card>
</template>
