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

const today = new Date();
const dayOne = new Date('2022-09-18');

const daysSince = Math.floor(
  (today.getTime() - dayOne.getTime()) / (1000 * 60 * 60 * 24)
);

const numSundays = () => {
  let numSundays = 0;
  for (let i = 0; i < daysSince; i++) {
    const date = new Date(dayOne.getTime() + i * 24 * 60 * 60 * 1000);
    if (date.getDay() === 0) {
      numSundays++;
    }
  }
  return numSundays;
};

const targetReadings = daysSince + numSundays();
</script>
<template>
  <div class="text-h5 row">
    <div>理想閲讀進度：</div>
    <div style="font-family: monospace">{{ targetReadings }}</div>
    <div>章</div>
  </div>
  <q-markup-table flat bordered>
    <thead>
      <tr class="bg-grey-3">
        <th>Reader</th>
        <th>Chapters Read</th>
        <th>Trend</th>
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
