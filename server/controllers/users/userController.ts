import { getUsersModel, deleteUserModel } from "../../models/users/userModel";

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

// Kontroler do usuwania użytkownika
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Usuwanie użytkownika z bazy danych
    const user = await deleteUserModel(id);
    if (user) {
      // Jeśli użytkownik został usunięty
      res.status(200).json({ message: "Użytkownik usunięty" });
    } else {
      // Jeśli użytkownik nie istnieje
      res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Błąd usuwania użytkownika" });
  }
};

// Eksportowanie kontrolerów
export { getUsers, deleteUser };
