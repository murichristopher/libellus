<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/stores";
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const store = useMainStore();
const { signOutUser, fetchUser } = authStore;

definePageMeta({
  middleware: ["auth"],
});

const isFetching = ref(true);

onBeforeMount(async () => {
  try {
    await fetchUser();
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    isFetching.value = false;
  }
});

const { user } = storeToRefs(authStore);

const signOut = () => {
  signOutUser();

  const toast = useToast();

  toast.add({
    id: "login_failed",
    title: "Successfully logged out",
    icon: "i-heroicons-arrow-left-on-rectangle",
    timeout: 2000,
  });

  return navigateTo("/login");
};
</script>

<template>
  <div v-if="!isFetching">
    <UContainer
      class="flex justify-center items-center h-screen d-flex flex-col gap-10"
    >
      <h1>Hello, {{ user.name }}!</h1>

      <UButton @click="signOut" icon="i-heroicons-arrow-left-on-rectangle"
        >Sign Out</UButton
      >
    </UContainer>
  </div>
</template>
