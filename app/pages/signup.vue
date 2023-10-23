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
  title: "libelius - Sign Up",
});

const state = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const errorForm = ref(false);
const form = ref(null);

const toast = useToast();
const store = useMainStore();
const authStore = useAuthStore();
const { signUpUser } = authStore;
const { status: userAuthenticationStatus } = storeToRefs(authStore);

const EMAIL_REGX: RegExp = new RegExp(
  '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(\
\.\.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(\
([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$'
);

const schema = object({
  name: string().required("Required").min(2).max(40),
  email: string()
    .required("Required")
    .matches(EMAIL_REGX, "Invalid email format"),
  password: string().min(6).required("Required"),
  passwordConfirmation: string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

async function submit() {
  errorForm.value = false;

  const { name, email, password } = state.value;

  await signUpUser(name, email, password);

  const { value: authStatus } = userAuthenticationStatus;

  console.log("status is", authStatus);

  if (authStatus === "server-failure") {
    toast.add({
      id: "login_failed",
      title: "Something went wrong.",
      description: "We could not log in you now. How about trying again later?",
      icon: "i-heroicons-x-mark",
      timeout: 4000,
    });
  } else if (authStatus === "invalid-data") {
    errorForm.value = true;
  } else if (authStatus === "success") {
    errorForm.value = false;
    navigateTo("/dashboard");
  }
}
</script>

<template>
  <h1 class="text-4xl mb-9">Sign Up</h1>

  <UForm ref="form" :state="state" @submit="submit" :schema="schema">
    <UFormGroup label="Name" name="name" size="lg">
      <UInput
        placeholder="Matias Andrada Augusto"
        icon="i-heroicons-user"
        v-model="state.name"
      />
    </UFormGroup>

    <div class="mt-4"></div>
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

    <div class="mt-4"></div>
    <UFormGroup
      label="Password Confirmation"
      name="passwordConfirmation"
      size="lg"
    >
      <UInput
        placeholder="*****"
        icon="i-heroicons-lock-closed"
        v-model="state.passwordConfirmation"
        type="password"
      />
    </UFormGroup>

    <UCard :class="'mt-8 max-w-sm'" v-if="errorForm">
      <div class="flex gap-x-2 justify-center items-center">
        <UIcon name="i-heroicons-x-mark" class="text-red-400" />
        <p class="text-red-400 text-sm break-words">User already exists</p>
      </div>
    </UCard>

    <div class="mt-8"></div>
    <UButton
      icon="i-heroicons-paper-airplane"
      size="lg"
      color="primary"
      variant="solid"
      label="Sign Up"
      :loading="store.loading"
      :trailing="false"
      type="submit"
    />
  </UForm>
</template>
