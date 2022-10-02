<script setup lang="ts">
import { supabase } from '@/supabase';
import { ref } from 'vue';

interface Reader {
  id: string;
  firstName: string;
  lastName: string;
}

interface ReadingRecord {
  reader: Reader;
  count: number;
}

const leaderboard = ref<ReadingRecord[]>([]);

supabase
  .from('leaderboard')
  .select('*')
  .order('count', { ascending: false })
  .then(({ data, error }) => {
    if (error) {
      console.error(error);
    } else {
      leaderboard.value = data.map((record) => ({
        reader: {
          id: record.id,
          firstName: record.first_name,
          lastName: record.last_name
        },
        count: record.count
      }));
    }
  });
</script>
<template>
  <q-markup-table flat bordered>
    <thead>
      <tr class="bg-grey-3">
        <th class="text-center">Reader</th>
        <th class="text-center">Chapters Read</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in leaderboard" :key="record.reader.id">
        <td class="text-center">
          {{ record.reader.firstName }} {{ record.reader.lastName }}
        </td>
        <td class="text-center">{{ record.count }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
