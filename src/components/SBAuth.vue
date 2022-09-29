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
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <div class="text-h2">Login or Sign-up</div>
      <p class="description">
        Authenticate via magic link with your email below
      </p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
