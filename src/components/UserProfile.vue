<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const user = useUserStore();

const { sbProfile } = storeToRefs(user);

const updatingProfile = ref(false);
const updateProfile = async () => {
  updatingProfile.value = true;
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: supabase.auth.user()?.id,
      first_name: firstName.value,
      last_name: lastName.value
    })
    .match({ id: supabase.auth.user()?.id });
  if (error) {
    // console.log("hi");
  } else if (data) {
    sbProfile.value = data[0];
  }
  updatingProfile.value = false;
};

const firstName = ref(sbProfile.value?.first_name);
const lastName = ref(sbProfile.value?.last_name);

user.$subscribe(() => {
  firstName.value = sbProfile.value?.first_name;
  lastName.value = sbProfile.value?.last_name;
});
</script>

<template>
  <q-card flat bordered>
    <q-card-section class="row justify-between">
      <div class="text-h5">個人資料</div>
      <q-space></q-space>
      <q-btn outline @click="supabase.auth.signOut()">登出</q-btn>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-gutter-xs">
      <q-input standout :model-value="user.sbUser?.email" dense readonly />

      <q-input outlined dense v-model="firstName" placeholder="名"></q-input>
      <q-input outlined dense v-model="lastName" placeholder="姓"></q-input>
      <q-item>
        <q-item-section>
          <div>顯示為：{{ firstName }} {{ lastName }}</div>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        outline
        color="primary"
        @click="updateProfile"
        :disable="updatingProfile">
        {{ sbProfile ? '更新' : '加入' }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
