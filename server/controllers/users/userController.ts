import { getUsersModel } from "../../models/users/userModel";

// Kontroler do pobierania wszystkich użytkowników
const getUsers = async (req, res) => {
  try {
    // Pobieranie użytkowników z bazy danych
    const users = await getUsersModel();
    // Zwracanie użytkowników w odpowiedzi
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Eksportowanie kontrolerów
export { getUsers };
