import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const sbUser = ref<null | any>(null);

  return { sbUser };
});
