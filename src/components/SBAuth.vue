<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  loading.value = true;
  const { error } = await supabase.auth.signIn(
    { email: email.value },
    {
      redirectTo: window.location.origin,
    }
  );
  if (error) alert(error.message);
  loading.value = false;
};
</script>

<template>
  <div style="height: 100vh" class="row justify-center items-center">
    <q-card>
      <q-card-section>
        <div class="text-h5">Welcome</div>
      </q-card-section>
      <q-card-section>
        <q-input standout v-model="email" type="email" prefix="Email:">
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Login"
          color="primary"
          :loading="loading"
          @click="handleLogin"
          :disable="!email"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
