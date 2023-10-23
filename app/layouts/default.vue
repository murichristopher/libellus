<template>
  <!-- Main container -->
  <div class="h-screen flex items-center justify-center" v-if="store.loading">
    <div class="flex flex-col items-center gap-7">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <span>Loading...</span>
    </div>
  </div>

  <!-- Content container -->
  <div class="h-screen" v-show="!store.loading">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores";

const store = useMainStore();
</script>
