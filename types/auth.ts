import type { UserAttributes } from "./user";
import type { FileAttributes } from "./file";

export type BearerToken = string | null | undefined;

export type UserImage = {
  url: string;
} & FileAttributes;

export interface AuthStore {
  token: BearerToken;
  user: UserAttributes | null;
  userImage: UserImage | null;
}
