import { getUsersModel } from "../models/users/userModel.ts";

export default defineEventHandler(async (event) => {
  const { method, query } = event;

  if (method === "GET") {
    try {
      return await getUsersModel();
    } catch (error) {
      throw createError({ statusCode: 500, message: "Error fetching users" });
    }
  }

  throw createError({ statusCode: 405, message: "Method Not Allowed" });
});
