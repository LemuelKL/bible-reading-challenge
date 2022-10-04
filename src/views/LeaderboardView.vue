<script setup lang="ts">
import { supabase } from '@/supabase';
import { ref } from 'vue';
import { useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
const bible = useBibleStore();
const { targetReadings } = storeToRefs(bible);

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
      <tr>
        <th>參加者</th>
        <th>已完成</th>
        <th>進度</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in leaderboard" :key="record.reader.id">
        <td class="text-center">
          {{ record.reader.firstName }} {{ record.reader.lastName }}
        </td>
        <td class="text-center">{{ record.count }}</td>
        <td class="text-center">
          <q-icon
            v-if="record.count > targetReadings"
            size="1.5rem"
            name="north_east"
            color="green" />
          <q-icon
            v-if="record.count === targetReadings"
            size="1.5rem"
            name="east"
            color="green" />
          <q-icon
            v-if="record.count < targetReadings"
            size="1.5rem"
            name="south_east"
            color="red" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
