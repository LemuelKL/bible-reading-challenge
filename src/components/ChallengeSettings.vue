<script setup lang="ts">
import { ref } from 'vue';
const date = ref('2021/01/01');
</script>

<template>
  <q-card>
    <q-card-section class="text-h5">Challenge Settings</q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="row q-gutter-sm">
        <q-input
          label="My 1st Day"
          outlined
          v-model="date"
          mask="date"
          :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale">
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn outline label="Save" color="primary" />
    </q-card-actions>
  </q-card>
</template>
