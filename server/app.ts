import express from "express";
import { connectDB } from "./config/database";
import userRoutes from "./routes/users/userRoutes";

const app = express();

// Middleware
app.use(express.json());

// Podłączamy trasy
app.use("/api", userRoutes);

// Łączymy się z bazą danych
connectDB();

// Uruchamiamy serwer Express
const PORT = process.env.PORT || 3000; // Możesz ustawić port z innej konfiguracji
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

export default app;
