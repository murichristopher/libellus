export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 44,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
