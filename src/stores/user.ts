import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const sbUser = ref<null | any>(null);
  const sbProfile = ref<null | {
    id: string;
    first_name: string;
    last_name: string;
    role: number;
  }>(null);

  return { sbUser, sbProfile };
});
