import cookie from "cookie";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { BearerToken } from "~/types/auth";

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

declare module "h3" {
  interface H3EventContext {
    token?: BearerToken;
    userId?: number;
  }
}

export default defineEventHandler((event) => {
  const cookies = cookie.parse(event.node.req.headers.cookie || "");
  const token = cookies.BEARER_TOKEN;

  if (!token) {
    throw createError({ statusCode: 401, message: "Brak tokenu" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    const userId = Number(decoded.id);

    if (isNaN(userId)) {
      throw createError({
        statusCode: 400,
        message: "Invalid user ID in token",
      });
    }

    event.context.token = token;
    event.context.userId = decoded.id;
  } catch (error) {
    throw createError({ statusCode: 401, message: "Token jest niepoprawny" });
  }
});
