import type { UserAttributes } from "~/server/types/user";

export type BaererToken = string | null | undefined;
export type CookiesExpires = string | Date;

export interface AuthStore {
  token: BaererToken;
  cookiesExpires: CookiesExpires;
  user: UserAttributes;
}
