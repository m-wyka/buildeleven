import type { UserAttributes } from "~/server/types/user";

export type BearerToken = string | null | undefined;

export interface AuthStore {
  token: BearerToken;
  user: UserAttributes | null;
}
