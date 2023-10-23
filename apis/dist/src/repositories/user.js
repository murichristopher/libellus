"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findById = exports.findByEmail = exports.all = void 0;
const user_1 = require("../models/user");
const all = () => {
    return user_1.User.find();
};
exports.all = all;
const findByEmail = (email) => {
    return user_1.User.findOne({ email: email });
};
exports.findByEmail = findByEmail;
const findById = (id) => {
    return user_1.User.findOne({ _id: id });
};
exports.findById = findById;
const create = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.User.create({
        name,
        email,
        password,
    });
});
exports.create = create;
