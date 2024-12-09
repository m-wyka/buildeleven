import type { UserAttributes } from "~/server/types/user";

export type BearerToken = string | null | undefined;
export type CookiesExpires = string | Date;

export interface AuthStore {
  token: BearerToken;
  user: UserAttributes | null;
}
