<script setup lang="ts">
import { supabase } from "@/supabase";
import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import bibleinfo from "./../stores/bibleinfo.json";

const $q = useQuasar();

interface Verse {
  engs: string;
  chap: number;
  sec: number;
  bible_text: string;
}
const verses = ref<Verse[]>([]);

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

const passage_id = computed(() => {
  const bookIndex = books.indexOf(book.value);
  return bookIndex + "-" + chapter.value;
});

watch(passage_id, (newPassageId) => {
  fetchVerse();
  fetchReadStatus();
});

const fetchVerse = async () => {
  const response = await fetch(
    `https://bible.fhl.net/json/qb.php?chap=${chapter.value}&gb=0&chineses=${book.value}`
  );
  const data = await response.json();
  verses.value = data.record;
};

const getReadRecordIdentifier = () => {
  return {
    reader: supabase.auth.user()?.id,
    book_id: books.indexOf(book.value),
    chapter: chapter.value,
  };
};

const loadingReadStatus = ref(false);
const read = ref(false);
const fetchReadStatus = async () => {
  loadingReadStatus.value = true;
  const { data, error } = await supabase
    .from("readings_done")
    .select("*")
    .match(getReadRecordIdentifier());
  loadingReadStatus.value = false;
  if (data) {
    read.value = data.length > 0;
  }
};

const toggleRead = async () => {
  if (read.value) {
    $q.dialog({
      title: "Confirm",
      message: "Would you like to mark this chapter as unread?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        const { data, error } = await supabase
          .from("readings_done")
          .delete()
          .match(getReadRecordIdentifier());
        fetchReadStatus();
      })
      .onCancel(() => {});
  } else {
    const { data, error } = await supabase
      .from("readings_done")
      .insert([getReadRecordIdentifier()]);
    fetchReadStatus();
  }
};

fetchVerse();
fetchReadStatus();
</script>

<template>
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
    <q-btn
      outline
      :color="read ? 'green' : 'red'"
      size="md"
      class="col-1"
      @click="toggleRead"
      :disable="loadingReadStatus"
    >
      <q-icon name="beenhere" />
    </q-btn>
  </div>

  <table class="q-ma-sm">
    <tr v-for="verse in verses" :key="verse.sec">
      <td>{{ verse.sec }}</td>
      <td>{{ verse.bible_text }}</td>
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
