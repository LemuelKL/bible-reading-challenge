import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/supabase';

import bible_dict from '@/stores/bible_dict.json';

export type BookName = keyof typeof bible_dict;

export interface BookInfo {
  name: BookName;
  chapters: number;
  abbrv: string;
}

export const useBibleStore = defineStore('bible', () => {
  const bookInfos = ref<BookInfo[]>([
    { name: '創世記', chapters: 50, abbrv: '創' },
    { name: '出埃及記', chapters: 40, abbrv: '出' },
    { name: '利未記', chapters: 27, abbrv: '利' },
    { name: '民數記', chapters: 36, abbrv: '民' },
    { name: '申命記', chapters: 34, abbrv: '申' },
    { name: '約書亞記', chapters: 24, abbrv: '書' },
    { name: '士師記', chapters: 21, abbrv: '士' },
    { name: '路得記', chapters: 4, abbrv: '得' },
    { name: '撒母耳記上', chapters: 31, abbrv: '撒上' },
    { name: '撒母耳記下', chapters: 24, abbrv: '撒下' },
    { name: '列王紀上', chapters: 22, abbrv: '王上' },
    { name: '列王紀下', chapters: 25, abbrv: '王下' },
    { name: '歷代志上', chapters: 29, abbrv: '代上' },
    { name: '歷代志下', chapters: 36, abbrv: '代下' },
    { name: '以斯拉記', chapters: 10, abbrv: '拉' },
    { name: '尼希米記', chapters: 13, abbrv: '尼' },
    { name: '以斯帖記', chapters: 10, abbrv: '斯' },
    { name: '約伯記', chapters: 42, abbrv: '伯' },
    { name: '詩篇', chapters: 150, abbrv: '詩' },
    { name: '箴言', chapters: 31, abbrv: '箴' },
    { name: '傳道書', chapters: 12, abbrv: '傳' },
    { name: '雅歌', chapters: 8, abbrv: '歌' },
    { name: '以賽亞書', chapters: 66, abbrv: '賽' },
    { name: '耶利米書', chapters: 52, abbrv: '耶' },
    { name: '耶利米哀歌', chapters: 5, abbrv: '哀' },
    { name: '以西結書', chapters: 48, abbrv: '結' },
    { name: '但以理書', chapters: 12, abbrv: '但' },
    { name: '何西阿書', chapters: 14, abbrv: '何' },
    { name: '約珥書', chapters: 3, abbrv: '珥' },
    { name: '阿摩司書', chapters: 9, abbrv: '摩' },
    { name: '俄巴底亞書', chapters: 1, abbrv: '俄' },
    { name: '約拿書', chapters: 4, abbrv: '拿' },
    { name: '彌迦書', chapters: 7, abbrv: '彌' },
    { name: '那鴻書', chapters: 3, abbrv: '鴻' },
    { name: '哈巴谷書', chapters: 3, abbrv: '哈' },
    { name: '西番雅書', chapters: 3, abbrv: '番' },
    { name: '哈該書', chapters: 2, abbrv: '該' },
    { name: '撒迦利亞書', chapters: 14, abbrv: '亞' },
    { name: '瑪拉基書', chapters: 4, abbrv: '瑪' },
    { name: '馬太福音', chapters: 28, abbrv: '太' },
    { name: '馬可福音', chapters: 16, abbrv: '可' },
    { name: '路加福音', chapters: 24, abbrv: '路' },
    { name: '約翰福音', chapters: 21, abbrv: '約' },
    { name: '使徒行傳', chapters: 28, abbrv: '徒' },
    { name: '羅馬書', chapters: 16, abbrv: '羅' },
    { name: '哥林多前書', chapters: 16, abbrv: '林前' },
    { name: '哥林多後書', chapters: 13, abbrv: '林後' },
    { name: '加拉太書', chapters: 6, abbrv: '加' },
    { name: '以弗所書', chapters: 6, abbrv: '弗' },
    { name: '腓立比書', chapters: 4, abbrv: '腓' },
    { name: '歌羅西書', chapters: 4, abbrv: '西' },
    { name: '帖撒羅尼迦前書', chapters: 5, abbrv: '帖前' },
    { name: '帖撒羅尼迦後書', chapters: 3, abbrv: '帖後' },
    { name: '提摩太前書', chapters: 6, abbrv: '提前' },
    { name: '提摩太後書', chapters: 4, abbrv: '提後' },
    { name: '提多書', chapters: 3, abbrv: '多' },
    { name: '腓利門書', chapters: 1, abbrv: '門' },
    { name: '希伯來書', chapters: 13, abbrv: '來' },
    { name: '雅各書', chapters: 5, abbrv: '雅' },
    { name: '彼得前書', chapters: 5, abbrv: '彼前' },
    { name: '彼得後書', chapters: 3, abbrv: '彼後' },
    { name: '約翰壹書', chapters: 5, abbrv: '約壹' },
    { name: '約翰貳書', chapters: 1, abbrv: '約貳' },
    { name: '約翰參書', chapters: 1, abbrv: '約參' },
    { name: '猶大書', chapters: 1, abbrv: '猶' },
    { name: '啟示錄', chapters: 22, abbrv: '啟' }
  ]);

  const readRecords = ref<{ [id: string]: boolean }>({});
  for (const bookInfo of bookInfos.value) {
    for (let i = 1; i <= bookInfo.chapters; i++) {
      readRecords.value[`${bookInfo.name}-${i}`] = false;
    }
  }

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN') {
      supabase
        .from('readings_done')
        .select('*')
        .match({ reader: supabase.auth.user()?.id })
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
          } else if (data) {
            for (const record of data) {
              readRecords.value[
                `${bookInfos.value[record.book - 1].name}-${record.chapter}`
              ] = true;
            }
          }
        });
    }
  });

  function matchReadRecord() {
    return {
      reader: supabase.auth.user()?.id,
      book: bookIdx.value + 1,
      chapter: chapter.value
    };
  }

  function markRead() {
    supabase
      .from('readings_done')
      .upsert(matchReadRecord())
      .then(({ data, error }) => {
        if (error) return;
        if (data.length > 0) {
          readRecords.value[chapterKey.value] = true;
        }
      });
  }
  function markUnread() {
    supabase
      .from('readings_done')
      .delete()
      .match(matchReadRecord())
      .then(({ data, error }) => {
        if (error) return;
        if (data.length > 0) {
          readRecords.value[chapterKey.value] = false;
        }
      });
  }
  function getTodaysChapter() {
    const today = new Date();
    const dayOne = new Date('2022-09-18');

    const daysSince = Math.floor(
      (today.getTime() - dayOne.getTime()) / (1000 * 60 * 60 * 24)
    );

    const numSundays = () => {
      let numSundays = 0;
      for (let i = 0; i < daysSince; i++) {
        const date = new Date(dayOne.getTime() + i * 24 * 60 * 60 * 1000);
        if (date.getDay() === 0) {
          numSundays++;
        }
      }
      return numSundays;
    };

    let targetReadings = daysSince + numSundays();

    for (let i = 0; i < 66; i++) {
      if (bookInfos.value[i].chapters >= targetReadings) {
        return {
          book: bookInfos.value[i],
          chapter: targetReadings
        };
      } else {
        targetReadings -= bookInfos.value[i].chapters;
      }
    }
  }

  const chapterKey = computed(() => `${book.value}-${chapter.value}`);
  const read = computed(() => {
    return readRecords.value[chapterKey.value];
  });
  const book = ref<BookName>('創世記');
  const chapter = ref(1);
  const chapterCount = computed(() => {
    return bookInfos.value.filter((b) => b.name === book.value)[0].chapters;
  });
  const verses = computed(() => {
    const bookDict = bible_dict[book.value];
    const chapterDict =
      bookDict[chapter.value.toString() as keyof typeof bookDict];
    return Object.keys(chapterDict).map((key) => {
      return chapterDict[key as keyof typeof chapterDict];
    });
  });
  const bookIdx = computed(() => {
    return bookInfos.value.findIndex((b) => b.name === book.value);
  });

  function goPrevChapter() {
    if (chapter.value > 1) {
      chapter.value--;
    } else if (bookIdx.value > 0) {
      const bookInfo = bookInfos.value[bookIdx.value - 1];
      book.value = bookInfo.name;
      chapter.value = bookInfo.chapters;
    }
  }
  function goNextChapter() {
    if (chapter.value < chapterCount.value) {
      chapter.value++;
    } else if (bookIdx.value < bookInfos.value.length - 1) {
      book.value = bookInfos.value[bookIdx.value + 1].name;
      chapter.value = 1;
    }
  }
  function goToBook(bookName: BookName) {
    book.value = bookName;
    chapter.value = 1;
  }
  function goToChapter(chapterNo: number) {
    chapter.value = chapterNo;
  }

  const today = new Date();
  const dayOne = new Date('2022-09-18');

  const daysSince = Math.floor(
    (today.getTime() - dayOne.getTime()) / (1000 * 60 * 60 * 24)
  );

  const numSundays = () => {
    let numSundays = 0;
    for (let i = 0; i < daysSince; i++) {
      const date = new Date(dayOne.getTime() + i * 24 * 60 * 60 * 1000);
      if (date.getDay() === 0) {
        numSundays++;
      }
    }
    return numSundays;
  };

  const targetReadings = ref(0);
  targetReadings.value = daysSince + numSundays();

  return {
    targetReadings,
    readRecords,
    read,
    markRead,
    markUnread,
    bookInfos,
    book,
    chapter,
    chapterCount,
    goPrevChapter,
    goNextChapter,
    goToBook,
    goToChapter,
    verses,
    getTodaysChapter
  };
});
