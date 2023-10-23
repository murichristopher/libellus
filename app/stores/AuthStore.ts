import { AxiosError } from "axios";
import axios from "axios";
import { defineStore } from "pinia";
import { useMainStore } from "@/stores";

type userAuthenticationStatus =
  | "success"
  | "unauthorized"
  | "invalid-data"
  | "server-failure"
  | null;

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      status: "" as userAuthenticationStatus,
      token: null as null | string,
      user: null as {} | null,
    };
  },

  getters: {
    isLoggedIn: (state) => state.token,
  },

  actions: {
    fetchToken() {
      const token = useCookie("token").value || null;

      this.token = token;

      return token;
    },

    setUser(name: string, email: string) {
      this.user = {
        name: name,
        email: email,
      };
    },

    async fetchUser() {
      const store = useMainStore();
      store.setLoading(true);

      try {
        const token = this.fetchToken();

        if (!token) {
          return null;
        }

        const { data } = await axios.get(
          "http://localhost:3399/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { name, email } = data;

        this.setUser(name, email);

        store.setLoading(false);

        return this.user;
      } catch (error) {
        const err = error as AxiosError;

        console.log(error);
        if (err.response && err.response.status === 401) {
          this.setStatus("unauthorized");
        } else {
          this.setStatus("server-failure");
        }
      } finally {
        store.setLoading(false);
      }
    },
    setStatus(newStatus: userAuthenticationStatus) {
      this.status = newStatus;
    },

    setToken(newToken: string) {
      const token = useCookie("token");
      token.value = newToken;
    },

    removeToken() {
      const token = useCookie("token");
      token.value = null;
    },

    signOutUser() {
      this.removeToken();
    },

    async loginUser(email: string | null, password: string | null) {
      const store = useMainStore();

      store.setLoading(true);
      try {
        const res = await axios.post("http://localhost:3399/users/login", {
          email: email,
          password: password,
        });

        this.setStatus("success");

        this.setToken(res.data.token);
      } catch (error) {
        const err = error as AxiosError;

        const newStatus: userAuthenticationStatus =
          err.response && err.response.status === 401
            ? "unauthorized"
            : "server-failure";

        this.setStatus(newStatus);
      } finally {
        store.setLoading(false);
      }
    },

    async signUpUser(
      name: string | null,
      email: string | null,
      password: string | null
    ) {
      const store = useMainStore();

      store.setLoading(true);

      try {
        const res = await axios.post("http://localhost:3399/users/signup", {
          name,
          email,
          password,
        });

        this.setStatus("success");

        this.setToken(res.data.token);
      } catch (error) {
        const err = error as AxiosError;

        const newStatus: userAuthenticationStatus =
          err.response &&
          (err.response.status === 409 || err.response.status === 400)
            ? "invalid-data"
            : "server-failure";

        this.setStatus(newStatus);
      } finally {
        store.setLoading(false);
      }
    },
  },
});
