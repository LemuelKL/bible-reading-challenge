<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useBibleStore, type BookInfo } from '@/stores/bible';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const bible = useBibleStore();
const { read, book, bookInfos, chapter, chapterCount } = storeToRefs(bible);

const $q = useQuasar();

function handleToggleRead() {
  if (!read.value) {
    bible.markRead();
  } else {
    $q.dialog({
      title: '標示未讀',
      message: '確定要標示此章為未讀嗎？',
      cancel: true,
      persistent: true
    }).onOk(() => {
      bible.markUnread();
    });
  }
}

const abbrv = computed(() => {
  const found = bookInfos.value.find((info: BookInfo) => info.name == book.value);
  return found ? found.abbrv : '??';
});
</script>

<template>
  <div class="row q-gutter-sm no-wrap">
    <q-select
      dark
      outlined
      dense
      options-dense
      v-on:update:model-value="bible.goToBook"
      :model-value="abbrv"
      :options="bookInfos.map((info: BookInfo) => info.name)"></q-select>
    <q-select
      dark
      outlined
      dense
      options-dense
      v-on:update:model-value="bible.goToChapter"
      :model-value="chapter"
      :options="
        Array(chapterCount)
          .fill(0)
          .map((_, idx) => 1 + idx)
      "></q-select>

    <q-btn flat dense icon="arrow_back" @click="bible.goPrevChapter" />
    <q-btn flat dense icon="arrow_forward" @click="bible.goNextChapter" />
    <q-btn
      flat
      dense
      icon="beenhere"
      :color="read ? 'green' : 'red'"
      @click="handleToggleRead" />
  </div>
</template>
