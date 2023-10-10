<script>
import { useCounterStore } from "@/stores/counter";

export default {
  computed: {
    count() {
      return this.$store.counter.count;
    },
  },
  methods: {
    increment() {
      this.$store.commit("counter/increment");
    },
  },
};
</script>
<template>
  <h1>oi</h1>
  <p>Counter: {{ count }}</p>
  <button type="button" @click="increment">Alo?</button>
</template>
