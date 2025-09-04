<script setup lang="ts">
import { useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const bible = useBibleStore();
const { readRecords, bookInfos } = storeToRefs(bible);

const todayTarget = bible.getTodaysChapter();

const router = useRouter();
</script>

<template>
  <table style="word-break: keep-all">
    <tbody>
      <tr v-for="bookInfo in bookInfos" :key="bookInfo.name">
        <th>{{ bookInfo.name }}</th>
        <td class="row" style="height: 100%">
          <template v-for="chapter in bookInfo.chapters" :key="chapter">
            <div
              class="progress-block row justify-center items-center"
              :class="{
                'bg-green': readRecords[`${bookInfo.name}-${chapter}`],
                'bg-grey-4': !readRecords[`${bookInfo.name}-${chapter}`],
                'target-block':
                  todayTarget?.book.name === bookInfo.name &&
                  todayTarget.chapter === chapter
              }"
              @click="
                router.push({
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
              <div
                v-if="chapter % 5 == 0"
                style="font-family: monospace"
                class="text-grey-6">
                {{ chapter }}
              </div>
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                class="bg-yellow-4 text-black text-bold"
                style="font-family: monospace">
                {{ chapter }}
              </q-tooltip>
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
