import { H3Event, createError } from "h3";
import bcrypt from "bcryptjs";
import { User } from "~/server/models/users/userModel.js";
import { CreateUserBody } from "~/server/types/user";
import { CustomError } from "~/types/api";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { name, email, password } = await readBody<CreateUserBody>(event);

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: "Wszystkie pola są wymagane.",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (user) {
      throw createError({
        statusCode: 400,
        message: "Użytkownik o tym e-mailu już istnieje.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
    });

    return {
      message: "Zarejestrowano konto pomyślnie.",
    };
  } catch (error) {
    const err = error as CustomError;
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message,
    });
  }
});
