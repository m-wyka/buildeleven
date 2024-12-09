import { H3Event, createError } from "h3";
import jwt from "jsonwebtoken";
import Cookies from "~/enums/cookies";
import { User } from "~/server/models/users/userModel.js";
import { LoginUserBody } from "~/server/types/user";
import { CustomError } from "~/types/api";

export default defineEventHandler(async (event: H3Event) => {
  const t = await useTranslation(event);

  try {
    const { email, password } = await readBody<LoginUserBody>(event);

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: t("AUTH.MESSAGES.INVALID_EMAIL_OR_PASSWORD"),
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !user.validatePassword(password)) {
      throw createError({
        statusCode: 401,
        message: t("AUTH.MESSAGES.INVALID_EMAIL_OR_PASSWORD"),
      });
    }

    if (!user.emailVerified) {
      throw createError({
        statusCode: 401,
        message: t("AUTH.MESSAGES.EMAIL_VERIFY"),
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Set BEARER_TOKEN
    event.node.res.setHeader(
      "Set-Cookie",
      `${Cookies.BEARER_TOKEN}=${token}; Max-Age=${
        7 * 24 * 60 * 60
      }; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

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
