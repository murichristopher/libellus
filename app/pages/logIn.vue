<script setup lang="ts">
import { object, string } from "yup";
import { useAuthStore } from "@/stores/AuthStore";
import { useMainStore } from "@/stores";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "authentication",
  middleware: "guest",
});
useHead({
  title: "libelius - Sign In",
});

const state = ref({
  email: "",
  password: "",
});
const errorForm = ref(false);

const form = ref(null);
const toast = useToast();
const store = useMainStore();
const authStore = useAuthStore();
const { loginUser } = authStore;
const { status: userAuthenticationStatus } = storeToRefs(authStore);

const EMAIL_REGX: RegExp = new RegExp(
  '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(\
\.\.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(\
([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$'
);

const schema = object({
  email: string()
    .required("Required")
    .matches(EMAIL_REGX, "Invalid email format"),
  password: string().min(6).required("Required"),
});

async function submit() {
  errorForm.value = false;

  const { email, password } = state.value;

  await loginUser(email, password);

  const { value: authStatus } = userAuthenticationStatus;

  if (authStatus === "server-failure") {
    toast.add({
      id: "login_failed",
      title: "Something went wrong.",
      description: "We could not log in you now. How about trying again later?",
      icon: "i-heroicons-x-mark",
      timeout: 4000,
    });
  } else if (authStatus === "unauthorized") {
    errorForm.value = true;
  } else if (authStatus === "success") {
    errorForm.value = false;
    navigateTo("/dashboard");
  }
}
</script>

<template>
  <h1 class="text-4xl mb-9">Log In</h1>

  <UForm ref="form" :state="state" @submit="submit" :schema="schema">
    <UFormGroup label="Email" name="email" size="lg">
      <UInput
        placeholder="you@example.com"
        icon="i-heroicons-envelope"
        v-model="state.email"
      />
    </UFormGroup>

    <div class="mt-4"></div>
    <UFormGroup label="Password" name="password" size="lg">
      <UInput
        placeholder="*****"
        icon="i-heroicons-lock-closed"
        v-model="state.password"
        type="password"
      />
    </UFormGroup>

    <div class="mt-8"></div>
    <UButton
      icon="i-heroicons-paper-airplane"
      size="lg"
      color="primary"
      variant="solid"
      label="Sign In"
      :loading="store.loading"
      :trailing="false"
      type="submit"
    />
  </UForm>

  <UCard :class="'mt-8 shadow-lg'" v-if="errorForm">
    <div class="flex gap-x-2 justify-center items-center">
      <UIcon name="i-heroicons-x-mark" class="text-red-400" />
      <p class="text-red-400">Invalid email or password</p>
    </div>
  </UCard>
</template>
