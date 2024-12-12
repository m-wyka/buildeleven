import bcrypt from "bcryptjs";
import auth from "~/server/utils/auth";
import { User } from "~/server/models/users/user.model";

export default defineEventHandler({
  onRequest: [auth],
  handler: async (event) => {
    const t = await useTranslation(event);
    const body = await readBody(event);
    const { currentPassword, newPassword } = body;
    const { userId } = event.context;

    if (!currentPassword || !newPassword) {
      throw createError({
        statusCode: 400,
        message: t("VALIDATION.ALL_FIELDS_REQUIRED"),
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Uzyc public validatePassword
    const isPasswordValid = await bcrypt.compareSync(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: t("VALIDATION.INVALID_CURRENT_PASSWORD"),
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return {
      statusCode: 200,
      message: t("PASSWORD_CHANGE.SUCCSS"),
    };
  },
});
