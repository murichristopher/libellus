"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./src/config");
const user_1 = __importDefault(require("./src/routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
dotenv_1.default.config({ path: `./${process.env.NODE_ENV}.env` });
const port = process.env.PORT || 3593;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_1.default);
app.get("/", (_req, res) => {
    res.send("Express + TypeScript Servers?");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
