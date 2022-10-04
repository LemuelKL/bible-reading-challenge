<script setup lang="ts">
import { useQuasar } from 'quasar';
import { type BookName, useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
const bible = useBibleStore();
const { read, book, bookInfos, chapter, chapterCount } = storeToRefs(bible);

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
</script>

<template>
  <div class="row q-gutter-sm no-wrap">
    <q-select
      dark
      outlined
      dense
      options-dense
      v-on:update:model-value="bible.goToBook"
      :model-value="book"
      :options="bookInfos.map((info) => info.name)"></q-select>
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

    <q-btn flat dense icon="arrow_back" @click="bible.goNextChapter" />
    <q-btn flat dense icon="arrow_forward" @click="bible.goNextChapter" />
    <q-btn
      flat
      dense
      icon="beenhere"
      :color="read ? 'green' : 'red'"
      @click="handleToggleRead" />
  </div>
</template>
