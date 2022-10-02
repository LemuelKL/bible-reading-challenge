import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/supabase';

interface APINav {
  chineses: string;
  engs: string;
  chap: number;
  sec: number;
}
interface APIRecord extends APINav {
  bible_text: string;
}
interface APIResponse {
  next: APINav;
  prev: APINav;
  proc: number;
  record: APIRecord[];
  record_count: number;
  status: string;
  v_name: string | null;
  version: string;
}

export interface Book {
  name: string;
  abbrv: string;
  chapters: number;
}

export const useBibleStore = defineStore('bible', () => {
  const books = ref<Book[]>([
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

  const bookIdx = ref(0);
  const book = computed(() => books.value[bookIdx.value]);
  const chapter = ref(1);

  function goPrevChapter() {
    if (chapter.value > 1) {
      chapter.value--;
    } else if (bookIdx.value > 0) {
      bookIdx.value--;
      chapter.value = books.value[bookIdx.value].chapters;
    }
    fetchVerses();
  }
  function goNextChapter() {
    if (chapter.value < book.value.chapters) {
      chapter.value++;
    } else if (bookIdx.value < books.value.length - 1) {
      bookIdx.value++;
      chapter.value = 1;
    }
    fetchVerses();
  }
  function goToBook(book: Book | number) {
    bookIdx.value =
      typeof book === 'number' ? book - 1 : books.value.indexOf(book);
    chapter.value = 1;
    fetchVerses();
  }

  function goToChapter(chap: number) {
    if (chap > 0 && chap <= book.value.chapters) {
      chapter.value = chap;
    }
    fetchVerses();
  }

  function matchReadRecord() {
    return {
      reader: supabase.auth.user()?.id,
      book: bookIdx.value + 1,
      chapter: chapter.value
    };
  }

  // we do with-in store side-effects here
  function fetchVerses() {
    fetch(
      'https://bible.fhl.net/json/qb.php?gb=0&chineses=' +
        book.value.abbrv +
        '&chap=' +
        chapter.value
    )
      .then((res) => res.json())
      .then((data: APIResponse) => {
        verses.value = data.record.map((r: APIRecord) => r.bible_text);
      });

    supabase
      .from('readings_done')
      .select('*')
      .match(matchReadRecord())
      .then(({ data, error }) => {
        if (error) return;
        if (data) {
          read.value = data.length > 0;
        }
      });
  }

  function markRead() {
    supabase
      .from('readings_done')
      .upsert(matchReadRecord())
      .then(({ data, error }) => {
        if (error) return;
        if (data.length > 0) {
          read.value = true;
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
          read.value = false;
        }
      });
  }

  const verses = ref<string[]>([]);
  const read = ref(false);

  fetchVerses();

  return {
    read,
    markRead,
    markUnread,
    books,
    book,
    chapter,
    goPrevChapter,
    goNextChapter,
    goToBook,
    goToChapter,
    verses
  };
});
