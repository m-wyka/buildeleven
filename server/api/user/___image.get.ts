import path from "path";
import auth from "~/server/utils/auth";
import { UsersFiles } from "~/server/models/users/userFiles.model";

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
      const file = await UsersFiles.findOne({ where: { userId } });

      if (!file) {
        return null;
      }

      return {
        file,
        url: `/uploads/${path.basename(file.filepath)}`,
      };
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: "Error fetching file",
      });
    }
  },
});
