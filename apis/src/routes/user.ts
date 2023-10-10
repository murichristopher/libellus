import { Router } from "express";

import { createUser, fetchUsers, logInUser } from "../controllers/user";

const User = Router();

User.get("/", fetchUsers);

User.post("/", createUser);

User.post("/login", logInUser);

export default User;
