<script setup lang="ts">
import { object, string, InferType } from "yup";
import { useAuthStore } from "@/stores/AuthStore";
import { useMainStore } from "@/stores";
const { isLoggedIn, loginUser } = useAuthStore();
import axios from "axios";
const state = ref({
  name: null as string | null,
  email: null as string | null,
  password: null as string | null,
});

const toast = useToast();
const loading = ref(false);

const store = useMainStore();

let EMAIL_REGX: RegExp = new RegExp(
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
});

async function submit() {
  // form.value.clear();
  // const teste = await loginUser(state.value.email, state.value.password);

  errorForm.value = true;
}
onMounted(() => {
  toast.add({
    id: "login_failed",
    title: "Something went wrong.",
    description: "We could not log in you know. How about trying again later?",
    icon: "i-heroicons-x-mark",
    timeout: 4000,
  });
});

const teste = computed(() => {
  return store.loading;
});

const errorForm = ref(false);

const x = () => {
  store.setLoading(!store.loading);
};

const form = ref(null);
</script>

<template>
  <UNotifications />

  <UContainer class="flex justify-center items-center h-screen">
    <UCard class="pt-6">
      <transition name="fade" mode="out-in">
        <UCard :class="'mb-8 shadow-lg'" v-if="errorForm">
          <div class="flex gap-x-2 justify-center items-center">
            <UIcon name="i-heroicons-x-mark" class="text-red-400" />
            <p class="text-red-400">Invalid email or password</p>
          </div>
        </UCard>
      </transition>

      <UForm ref="form" :state="state" @submit="submit" :schema="schema">
        <UFormGroup label="Name" name="name" size="lg">
          <UInput
            placeholder="Matias Andrada Augusto"
            icon="i-heroicons-user"
            v-model="state.name"
          />
        </UFormGroup>
        <div class="mt-4"></div>
        <UFormGroup
          label="Email"
          name="email"
          help="We'll only use this for spam."
          size="lg"
        >
          <UInput
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
            v-model="state.email"
          />
        </UFormGroup>

        <div class="mt-4"></div>
        <UFormGroup
          label="Password"
          name="password"
          help="We'll never share this password."
          size="lg"
        >
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
          label="Sign Up"
          :loading="teste"
          :trailing="false"
          type="submit"
        />
      </UForm>
    </UCard>
  </UContainer>
</template>
