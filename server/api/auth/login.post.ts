import { H3Event, createError } from "h3";
import jwt from "jsonwebtoken";
import { User } from "~/server/models/users/userModel.js";
import { LoginUserBody } from "~/server/types/user";
import { CustomError } from "~/types/api";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email, password } = await readBody<LoginUserBody>(event);

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Nieprawidłowy e-mail lub hasło.",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !user.validatePassword(password)) {
      throw createError({
        statusCode: 401,
        message: "Nieprawidłowy e-mail lub hasło.",
      });
    }

    if (!user.emailVerified) {
      throw createError({
        statusCode: 401,
        message: "Proszę zweryfikować swój adres e-mail przed zalogowaniem.",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const {
      password: userPassword,
      createdAt,
      updatedAt,
      ...userData
    } = user.toJSON();

    return {
      token,
      user: userData,
    };
  } catch (error) {
    const err = error as CustomError;
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message,
    });
  }
});
