import { defineStore } from "pinia";
import Cookies from "~/enums/cookies";
import type { UserAttributes } from "~/types/user";
import type { AuthStore, BearerToken, UserImage } from "~/types/auth";
import type { FileAttributes } from "~/types/file";

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    token: useCookie<BearerToken>(Cookies.BEARER_TOKEN).value,
    user: null,
    userImage: null,
  }),

  getters: {
    isAuth: (state) =>
      typeof state.token === "string" && state.token.length > 0,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getUserImage: (state) => state.userImage,
  },

  actions: {
    setToken(value: BearerToken) {
      this.token = value;
    },

    setUser(value: UserAttributes | null) {
      this.user = value;
    },

    setUserImage(value: UserImage | null) {
      this.userImage = value;
    },

    clearCookies() {
      this.setToken(null);
    },
  },
});
