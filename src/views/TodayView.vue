<script setup lang="ts">
import { useQuasar } from 'quasar';

import { useBibleStore } from '@/stores/bible';
import { storeToRefs } from 'pinia';
const bible = useBibleStore();
const { read, book, books, chapter, verses } = storeToRefs(bible);

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
    <div class="row q-gutter-md">
        <q-select
            class="col"
            dense
            options-dense
            v-on:update:model-value="bible.goToBook"
            :model-value="bible.book"
            :options="books"
            option-label="name"
            label="Books"
        />
        <q-select
            class="col"
            dense
            options-dense
            v-on:update:model-value="bible.goToChapter"
            :model-value="chapter"
            :options="
                Array(book.chapters)
                    .fill(0)
                    .map((_, idx) => 1 + idx)
            "
            label="Chapters"
        />
        <q-btn outline @click="bible.goPrevChapter"
            ><q-icon name="arrow_back"></q-icon
        ></q-btn>
        <q-btn outline @click="bible.goNextChapter"
            ><q-icon name="arrow_forward"></q-icon
        ></q-btn>
        <q-btn
            outline
            :color="read ? 'green' : 'red'"
            size="md"
            class="col-1"
            @click="handleToggleRead"
        >
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
