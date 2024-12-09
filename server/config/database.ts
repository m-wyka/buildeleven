import { Sequelize } from "sequelize";

// Tworzymy instancję Sequelize
const sequelize = new Sequelize({
  host: "localhost", // Nazwa hosta
  dialect: "postgres", // Dialekt bazy danych
  username: "postgres", // Użytkownik bazy danych
  password: "password", // Hasło do bazy danych
  database: "buildeleven", // Nazwa bazy danych
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Połączono z bazą danych!");
  } catch (error) {
    console.error("Nie udało się połączyć z bazą danych:", error);
  }
};

export { sequelize, connectDB };
