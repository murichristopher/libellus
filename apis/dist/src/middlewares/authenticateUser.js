"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // req.jwtPayload = jwt.decode(token!) as JwtExpPayload;
        // console.log("oioii");
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        // if (req.jwtPayload) {
        //   return res.status(401);
        // }
        if (!req.user) {
            return res.status(401);
        }
        // console.log("to auqi");
        next();
    }
    catch (error) {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader;
        console.log("token", token);
        return res.status(401).json({ message: "Authentication failed" });
    }
};
exports.default = authenticateUser;
