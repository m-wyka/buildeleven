import { sequelize } from "../../config/database.js";
import { User } from "./userModel.js";

const createTableAndInsertUser = async () => {
  try {
    // Synchronizacja bazy danych (nie usuwamy tabeli za każdym razem)
    await sequelize.sync(); // Nie używamy { force: true }, aby nie usuwać tabeli
    console.log("Tabela użytkowników została stworzona lub zaktualizowana.");

    const newUser = await User.create({
      name: "Jan Kowalski",
      email: "jan.kowalski@example.com",
      password: "securepassword123",
    });
    console.log("Użytkownik został dodany:", newUser);
  } catch (error) {
    console.error(
      "Błąd podczas tworzenia tabeli i dodawania użytkownika:",
      error
    );
  }
};

// Uruchomienie funkcji
createTableAndInsertUser();
