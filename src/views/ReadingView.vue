<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { type BookName, useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
import router from '@/router';
const bible = useBibleStore();
const { read, book, bookInfos, chapter, chapterCount, verses } =
  storeToRefs(bible);

const $q = useQuasar();

function handleToggleRead() {
  if (!read.value) {
    bible.markRead();
  } else {
    $q.dialog({
      title: 'Mark as unread',
      message: 'Are you sure you want to mark this chapter as unread?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      bible.markUnread();
    });
  }
}

const route = useRoute();
if (route.params.book) {
  const bookName = route.params.book;
  if (
    bookInfos.value
      .map((info) => info.name as string)
      .includes(bookName as string)
  ) {
    bible.goToBook(route.params.book as BookName);
  }
}
if (route.params.chapter) {
  const chapterNo = parseInt(route.params.chapter as string);
  if (chapterNo > 0 && chapterNo <= chapterCount.value) {
    bible.goToChapter(chapterNo);
  }
}

watch(
  () => book.value,
  (book) => {
    if (book) {
      router.push({
        name: 'reading',
        params: { book: book, chapter: chapter.value }
      });
    }
  }
);
watch(
  () => chapter.value,
  (chapter) => {
    if (chapter) {
      router.push({
        name: 'reading',
        params: { book: book.value, chapter: chapter }
      });
    }
  }
);
</script>

<template>
  <div class="row q-gutter-md">
    <q-select
      style="width: 190px"
      outlined
      dense
      options-dense
      v-on:update:model-value="bible.goToBook"
      :model-value="book"
      :options="bookInfos.map((info) => info.name)">
      <template v-slot:prepend>
        <q-icon name="book" color="accent" />
      </template>
    </q-select>
    <q-select
      style="width: 100px"
      outlined
      dense
      options-dense
      v-on:update:model-value="bible.goToChapter"
      :model-value="chapter"
      :options="
        Array(chapterCount)
          .fill(0)
          .map((_, idx) => 1 + idx)
      ">
      <template v-slot:prepend>
        <q-icon name="summarize" :color="read ? 'teal' : ''" />
      </template>
    </q-select>
    <q-space></q-space>
    <q-btn outline @click="bible.goPrevChapter">
      <q-icon name="arrow_back"></q-icon>
    </q-btn>
    <q-btn outline @click="bible.goNextChapter">
      <q-icon name="arrow_forward"></q-icon>
    </q-btn>
    <q-btn
      outline
      :color="read ? 'green' : 'red'"
      size="md"
      class="col-1"
      @click="handleToggleRead">
      <q-icon name="beenhere" />
    </q-btn>
  </div>

  <table class="q-ma-sm">
    <tr v-for="[idx, verse] of verses.entries()" :key="idx">
      <td>{{ idx + 1 }}</td>
      <td>{{ verse }}</td>
    </tr>
  </table>
</template>

<style scoped>
table td,
table td * {
  vertical-align: top;
}
td {
  padding: 4px;
}
</style>

<!-- // unv -->
