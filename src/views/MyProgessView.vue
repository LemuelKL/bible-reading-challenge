<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { type BookInfo, useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
const bible = useBibleStore();
const { bookInfos } = storeToRefs(bible);

interface BookReadingRecord extends BookInfo {
  bookNo: number;
  chaptersRead: boolean[];
}

const bookReadingRecords = ref<BookReadingRecord[]>([]);
let bookNo = 1;
for (const bookInfo of bookInfos.value) {
  for (let chapter = 1; chapter <= bookInfo.chapters; chapter++) {
    if (chapter === 1) {
      bookReadingRecords.value.push({
        bookNo,
        chaptersRead: [false],
        ...bookInfo
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

const todayTarget = bible.getTodaysChapter();
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
            <div
              class="progress-block"
              :class="{
                'bg-green': read,
                'bg-grey-4': !read,
                'target-block':
                  todayTarget?.book.abbrv === bookRecord.abbrv &&
                  todayTarget.chapter === index + 1
              }"
              @click="
                $router.push({
                  name: 'reading',
                  params: {
                    book: bookRecord.name,
                    chapter: index + 1
                  }
                })
              ">
              <q-tooltip>{{ index + 1 }}</q-tooltip>
            </div>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.progress-block {
  width: 24px;
  height: 24px;
  margin: 2px;
}
.progress-block:hover {
  cursor: pointer;
  outline: auto 1px;
}
.target-block {
  border: 2px solid red;
}
</style>
