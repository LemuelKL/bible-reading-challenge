<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
import type { Book } from '@/stores/bible';
const bible = useBibleStore();
const { books } = storeToRefs(bible);

interface BookReadingRecord extends Book {
  bookNo: number;
  chaptersRead: boolean[];
}

const bookReadingRecords = ref<BookReadingRecord[]>([]);

let bookNo = 1;
for (const book of books.value) {
  for (let chapter = 1; chapter <= book.chapters; chapter++) {
    if (chapter === 1) {
      bookReadingRecords.value.push({
        bookNo,
        chaptersRead: [false],
        ...book
      });
    } else {
      bookReadingRecords.value[bookNo - 1].chaptersRead.push(false);
    }
  }
  bookNo++;
}
supabase
  .from('readings_done')
  .select('book, chapter')
  .eq('reader', supabase.auth.user()?.id)
  .order('book, chapter', { ascending: true })
  .then(({ data }) => {
    if (data) {
      for (const record of data) {
        bookReadingRecords.value[record.book - 1].chaptersRead[
          record.chapter - 1
        ] = true;
      }
    }
  });
</script>

<template>
  <table style="word-break: keep-all">
    <tbody>
      <tr
        v-for="bookRecord in bookReadingRecords.sort(
          (a, b) => a.bookNo - b.bookNo
        )"
        :key="bookRecord.bookNo">
        <th>{{ bookRecord.name }}</th>
        <td class="row" style="height: 100%">
          <template
            v-for="(read, index) of bookRecord.chaptersRead"
            :key="index">
            <div v-if="read" class="progress-block bg-green"></div>
            <div v-else class="progress-block bg-grey-4"></div>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.progress-block {
  width: 10px;
  height: 10px;
  margin: 2px;
}
</style>
