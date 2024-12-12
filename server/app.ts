import express from "express";
import { resetDatabase } from "./utils/reset.db.ts";

const app = express();

const startServer = async () => {
  try {
    // await resetDatabase();

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      console.log(`Serwer działa na porcie ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
