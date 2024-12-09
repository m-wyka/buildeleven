import { Optional } from "sequelize";
import { BaererToken } from "~/types/auth";

export interface UserAttributes {
  id: number;
  name: string;
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
  name: string;
  email: string;
  password: string;
}

// Login
export interface LoginUserBody {
  email: string;
  password: string;
}

export type UserResponse = {
  token: BaererToken;
  user: UserAttributes;
};
