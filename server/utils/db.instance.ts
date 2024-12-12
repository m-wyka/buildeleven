import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  username: "postgres",
  password: "password",
  database: "buildeleven",
});
