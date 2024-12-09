import { defineStore } from "pinia";
import type { UserAttributes } from "~/server/types/user";
import type { AuthStore, BaererToken, CookiesExpires } from "~/types/auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    token: useCookie<BaererToken>("BEARER-TOKEN").value,
    cookiesExpires: useCookie<CookiesExpires>("cookies_expires").value,
    user: {} as UserAttributes,
  }),

  getters: {
    isAuth: (state) =>
      typeof state.token === "string" && state.token.length > 0,
    getCookiesExpires: (state) => new Date(state.cookiesExpires),
  },

  actions: {
    setCookieExpires(clear?: boolean) {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const cookie = useCookie("cookies_expires", {
        expires,
      });

      if (clear) {
        cookie.value = null;
      } else {
        cookie.value = expires.toISOString();
        this.cookiesExpires = expires.toISOString();
      }
    },

    setToken(value: BaererToken) {
      if (value) {
        this.setCookieExpires();
      }

      const baererToken = useCookie("BEARER-TOKEN", {
        expires: this.getCookiesExpires ?? new Date(),
      });

      baererToken.value = value;
      this.token = value;
    },

    setUser(value: UserAttributes) {
      this.user = value;
    },

    clearCookies() {
      this.setCookieExpires(true);
      this.setToken(null);
    },
  },
});
