import { getUsersModel, deleteUserModel } from "../models/users/userModel.ts";

export default defineEventHandler(async (event) => {
  const { method, query } = event;

  if (method === "GET") {
    try {
      return await getUsersModel();
    } catch (error) {
      throw createError({ statusCode: 500, message: "Error fetching users" });
    }
  }

  if (method === "DELETE") {
    const { id } = query;
    try {
      const user = await deleteUserModel(id);
      if (!user) {
        throw createError({ statusCode: 404, message: "User not found" });
      }
      return { message: "User deleted" };
    } catch (error) {
      throw createError({ statusCode: 500, message: "Error deleting user" });
    }
  }

  throw createError({ statusCode: 405, message: "Method Not Allowed" });
});
