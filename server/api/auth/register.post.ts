import { H3Event, createError } from "h3";
import bcrypt from "bcryptjs";
import { User } from "~/server/models/users/userModel.js";
import { CreateUserBody } from "~/server/types/user";
import { CustomError } from "~/types/api";

export default defineEventHandler(async (event: H3Event) => {
  const t = await useTranslation(event);

  try {
    const { nickname, email, password } = await readBody<CreateUserBody>(event);

    if (!nickname || !email || !password) {
      throw createError({
        statusCode: 400,
        message: t("AUTH.MESSAGES.ALL_FIELDS_REQUIRED"),
      });
    }

    const userByNickame = await User.findOne({ where: { nickname } });
    const userByEmail = await User.findOne({ where: { email } });

    if (userByNickame || userByEmail) {
      throw createError({
        statusCode: 409,
        message: t("AUTH.MESSAGES.USER_EXIST"),
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      nickname,
      email,
      password: hashedPassword,
      emailVerified: false,
    });

    return {
      message: t("AUTH.MESSAGES.REGISTER_SUCCESS"),
    };
  } catch (error) {
    const err = error as CustomError;
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message,
    });
  }
});
