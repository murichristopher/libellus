import { useAuthStore } from "@/stores/AuthStore";

export default defineNuxtRouteMiddleware(() => {
  const { fetchToken } = useAuthStore();

  const token = fetchToken();

  if (token) {
    return navigateTo("/dashboard");
  }
});
