<script setup lang="ts">
import { ref, computed, watch } from "vue";
import bibleinfo from "./../stores/bibleinfo.json";
const verses = ref([]);

const books = [
  "創",
  "出",
  "利",
  "民",
  "申",
  "書",
  "士",
  "得",
  "撒上",
  "撒下",
  "王上",
  "王下",
  "代上",
  "代下",
  "拉",
  "尼",
  "斯",
  "伯",
  "詩",
  "箴",
  "傳",
  "歌",
  "賽",
  "耶",
  "哀",
  "結",
  "但",
  "何",
  "珥",
  "摩",
  "俄",
  "拿",
  "彌",
  "鴻",
  "哈",
  "番",
  "該",
  "亞",
  "瑪",
  "太",
  "可",
  "路",
  "約",
  "徒",
  "羅",
  "林前",
  "林後",
  "加",
  "弗",
  "腓",
  "西",
  "帖前",
  "帖後",
  "提前",
  "提後",
  "多",
  "門",
  "來",
  "雅",
  "彼前",
  "彼後",
  "約一",
  "約二",
  "約三",
  "猶",
  "啟",
];

const book = ref(books[0]);
const chapter = ref(1);
const chapters = computed(() => {
  const bookIndex = books.indexOf(book.value);
  return bibleinfo[bookIndex].chapters.map((c) => {
    return c.chapter;
  });
});
watch(chapters, (newChapters) => {
  if (chapter.value >= newChapters.length) {
    chapter.value = 1;
  }
});

const loading = ref(false);
const fetchVerse = async () => {
  loading.value = true;
  const response = await fetch(
    `https://bible.fhl.net/json/qb.php?chap=${chapter.value}&gb=0&chineses=${book.value}`
  );
  const data = await response.json();
  verses.value = data.record;
  loading.value = false;
};
</script>

<template>
  <main>
    <div class="row q-gutter-md">
      <q-select
        class="col"
        dense
        options-dense
        v-model="book"
        :options="books"
        label="Books"
      />
      <q-select
        class="col"
        dense
        options-dense
        v-model="chapter"
        :options="chapters"
        label="Chapters"
      />
      <q-btn size="md" class="col-1" @click="fetchVerse" :loading="loading">
        <q-icon name="search" />
        <template v-slot:loading> <q-spinner-facebook /> </template>
      </q-btn>
    </div>

    <div v-for="verse in verses" :key="verse.engs + verse.chap + verse.sec">
      {{ verse.bible_text }}
    </div>
  </main>
</template>

<!-- // unv -->
