<script setup lang="ts">
import { supabase } from '@/supabase';
import { ref } from 'vue';

interface ReadingRecord {
    userId: string;
    readCount: number;
}

const userIds = ref<string[]>([]);
const userReadingRecords = ref<ReadingRecord[]>([]);

async function fetchReadCount(uid: string) {
    const { data, error, count } = await supabase
        .from('readings_done')
        .select('*', { count: 'exact' })
        .eq('reader', uid);

    if (error) {
        console.error(error);
        return;
    }

    if (data && count) {
        userReadingRecords.value.push({
            userId: uid,
            readCount: count
        });
    }
}

supabase
    .from('profiles')
    .select('id')
    .then(({ data, error }) => {
        if (error) {
            console.error(error);
        } else {
            userIds.value = data.map((profile) => {
                return profile.id;
            });
        }
    })
    .then(() => {
        userIds.value.forEach((userId) => {
            fetchReadCount(userId);
        });
    });
</script>
<template>
    <div>Leaderboard</div>
    <div v-for="record in userReadingRecords" :key="record.userId">
        {{ record.userId }} {{ record.readCount }}
    </div>
</template>
