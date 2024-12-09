import { defineStore } from "pinia";
import Cookies from "~/enums/cookies";
import type { UserAttributes } from "~/server/types/user";
import type { AuthStore, BearerToken } from "~/types/auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    token: useCookie<BearerToken>(Cookies.BEARER_TOKEN).value,
    user: null,
  }),

  getters: {
    isAuth: (state) =>
      typeof state.token === "string" && state.token.length > 0,
  },

  actions: {
    setToken(value: BearerToken) {
      this.token = value;
    },

    setUser(value: UserAttributes | null) {
      this.user = value;
    },

    clearCookies() {
      this.setToken(null);
    },
  },
});
