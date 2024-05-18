import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});

  user.value.loggedIn = false;

  return { user };
});
