import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    status: "",
    loading: false,
  }),
  actions: {
    increment() {},

    setLoading(newLoading: boolean) {
      this.loading = newLoading;
    },
  },
});
