import { User } from "../models/users/index";
import { sequelize } from "../utils/db.instance";

const resetDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const existingUser = await User.findOne({
      where: { email: "m.wyka@o2.pl" },
    });

    if (!existingUser) {
      await User.create({
        nickname: "mwyka",
        email: "m.wyka@o2.pl",
        password:
          "$2a$12$lWk/XVz3I55JzYkcP6NiwuKi.TTqVK/g8DADJWB34Oem3NmkW7Hm6",
        emailVerified: true,
      });
    }
  } catch (error) {
    console.error("Error initializing the database:", error);
    throw error;
  }
};

export { resetDatabase };
