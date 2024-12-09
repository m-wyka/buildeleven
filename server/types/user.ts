import { Optional } from "sequelize";
import { BearerToken } from "~/types/auth";

export interface UserAttributes {
  id: number;
  nickname: string;
  email: string;
  password: string;
  emailVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

// Create
export interface CreateUserBody {
  nickname: string;
  email: string;
  password: string;
}

// Login
export interface LoginUserBody {
  email: string;
  password: string;
}

export type UserResponse = {
  token: BearerToken;
  user: UserAttributes;
};
