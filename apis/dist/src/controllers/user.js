"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = exports.createUser = exports.fetchUsers = exports.profile = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository = __importStar(require("../repositories/user"));
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository.findById(req.user.userId);
    return res.status(200).json(user);
});
exports.profile = profile;
const fetchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield UserRepository.all());
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.fetchUsers = fetchUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const newUser = yield UserRepository.create(name, email, password);
        const payload = {
            userId: newUser.id,
            userEmail: newUser.email,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        return res.status(201).json({ newUser, token });
    }
    catch (error) {
        const err = error;
        console.error(error);
        if (err.name === "ValidationError") {
            return res
                .status(400)
                .json({ message: "Validation Error", details: err.message });
        }
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Duplicate Key Error",
                details: "Email already exists",
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            details: "An unexpected error occurred",
        });
    }
});
exports.createUser = createUser;
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserRepository.findByEmail(email);
    try {
        if (user && email && password && (user === null || user === void 0 ? void 0 : user.password) === password) {
            const payload = {
                userId: user.id,
                userEmail: user.email,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
            return res.status(200).json({ user, token });
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.logInUser = logInUser;
