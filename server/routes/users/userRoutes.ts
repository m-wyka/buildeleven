import express from "express";
import { getUsers, deleteUser } from "../../controllers/users/userController";

const router = express.Router();

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

export default router;
