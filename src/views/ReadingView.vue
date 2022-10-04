<script setup lang="ts">
import { scroll } from 'quasar';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { type BookName, useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
import router from '@/router';
const bible = useBibleStore();
const { book, bookInfos, chapter, chapterCount, verses } = storeToRefs(bible);

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

const { getScrollTarget, setVerticalScrollPosition } = scroll;
watch(
  () => verses.value,
  (verses) => {
    if (verses) {
      const verse = verses[0];
      if (verse) {
        const el = document.getElementById('verse-0');
        if (!el) return;
        const target = getScrollTarget(el);
        const offset = el.offsetTop;
        setVerticalScrollPosition(target, offset, 1000);
      }
    }
  }
);
</script>

<template>
  <table class="q-ma-sm">
    <tr
      v-for="[idx, verse] of verses.entries()"
      :key="idx"
      :id="`verse-${idx}`">
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
