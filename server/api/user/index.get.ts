import auth from "~/server/utils/auth";
import { User } from "~/server/models/users/user.model";

export default defineEventHandler({
  onRequest: [auth],
  handler: async (event) => {
    const { userId } = event.context;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw createError({
          statusCode: 404,
          message: "User not found",
        });
      }

      const { id, nickname, email, emailVerified, imageId } = user;

      return { id, nickname, email, emailVerified, imageId };
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: "Error fetching user data",
      });
    }
  },
});
