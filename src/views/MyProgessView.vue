<script setup lang="ts">
import { useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
const bible = useBibleStore();
const { readRecords, bookInfos } = storeToRefs(bible);

const todayTarget = bible.getTodaysChapter();
</script>

<template>
  <table style="word-break: keep-all">
    <tbody>
      <tr v-for="bookInfo in bookInfos" :key="bookInfo.name">
        <th>{{ bookInfo.name }}</th>
        <td class="row" style="height: 100%">
          <template v-for="chapter in bookInfo.chapters" :key="chapter">
            <div
              class="progress-block"
              :class="{
                'bg-green': readRecords[`${bookInfo.name}-${chapter}`],
                'bg-grey-4': !readRecords[`${bookInfo.name}-${chapter}`],
                'target-block':
                  todayTarget?.book.name === bookInfo.name &&
                  todayTarget.chapter === chapter
              }"
              @click="
                $router.push({
                  name: 'reading',
                  params: {
                    book: bookInfo.name,
                    chapter: chapter
                  }
                })
              "
              style="
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -o-user-select: none;
              ">
              <q-tooltip>{{ chapter }}</q-tooltip>
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
