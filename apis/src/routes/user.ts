import { Router } from "express";
import { fetchUsers, logInUser, createUser, profile } from "../controllers/user";
import authenticateUser from "../middlewares/authenticateUser";

const User = Router();

User.get("/", authenticateUser, fetchUsers);

User.get("/profile", authenticateUser, profile);

User.post("/login", logInUser);

User.post("/signup", createUser);

export default User;
