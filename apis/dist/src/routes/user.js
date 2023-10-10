"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const User = (0, express_1.Router)();
User.get("/", user_1.fetchUsers);
User.post("/", user_1.createUser);
User.post("/login", user_1.logInUser);
exports.default = User;
