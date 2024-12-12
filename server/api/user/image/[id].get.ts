import path from "path";
import auth from "~/server/utils/auth";
import { User, UsersFiles } from "~/server/models/users";

export default defineEventHandler({
  onRequest: [auth],
  handler: async (event) => {
    const userId = event.context.params?.id;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    try {
      const user = await User.findOne({
        where: { id: userId },
        include: {
          model: UsersFiles,
          as: "image",
        },
      });

      if (!user) {
        throw createError({
          statusCode: 400,
          message: "User not found",
        });
      }

      if (!user.imageId) {
        return;
      }

      const file = await UsersFiles.findByPk(user.imageId);

      if (!file) {
        return;
      }

      return {
        url: `/uploads/${path.basename(file.filepath)}`,
      };
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: "Error fetching user data",
      });
    }
  },
});
