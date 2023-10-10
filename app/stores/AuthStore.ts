import axios from "axios";
import { defineStore } from "pinia";
import { useMainStore } from "@/stores";


export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      status: "",
      token:
        typeof window !== "undefined" ? localStorage.getItem("token") : null,
      user: {},
    };
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async loginUser(email: string | null, password: string | null) {
      const store = useMainStore();
      store.setLoading(true);

      try {
        const res = await axios.post("http://localhost:3399/users/login", {
          email: email,
          password: password,
        });

        localStorage.setItem("token", "axou");

        this.user = res;
      } catch (err) {
        console.log(err);
      } finally {
        store.setLoading(false);
      }
    },
  },
});
