import { sequelize } from "../utils/db.instance";
import { initUserRelations } from "~/server/relations/users/user.relation";

initUserRelations();

export default defineNitroPlugin(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
});
