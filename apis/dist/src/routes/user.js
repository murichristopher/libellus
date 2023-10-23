"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const User = (0, express_1.Router)();
User.get("/", authenticateUser_1.default, user_1.fetchUsers);
User.get("/profile", authenticateUser_1.default, user_1.profile);
User.post("/login", user_1.logInUser);
User.post("/signup", user_1.createUser);
exports.default = User;
