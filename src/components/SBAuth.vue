<script setup lang="ts">
import { useQuasar } from 'quasar';
import { supabase } from '../supabase';

const $q = useQuasar();

async function signInWithGoogle() {
  const { error } = await supabase.auth.signIn(
    { provider: 'google' },
    {
      redirectTo: window.location.origin
    }
  );
  if (error) $q.notify({ type: 'negative', message: error.message });
}
</script>

<template>
  <div style="height: 100vh" class="row justify-center items-center">
    <q-card flat bordered>
      <q-card-section class="welcome">
        <div class="text-h4">1189 Challenge</div>
        <div class="text-subtitle2 text-grey-6" style="max-width: 250px">
          1095日讀完1189章聖經經文
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="evenly">
        <q-btn
          @click="signInWithGoogle"
          no-caps
          outline
          align="around"
          label="以 Google 登入"
          icon="img:/assets/g.png" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<style>
.welcome {
  font-family: 'Times New Roman', Times, serif;
}
</style>
