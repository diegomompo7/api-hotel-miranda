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
exports.verifyToken = exports.generateToken = void 0;
const UserInterface_1 = require("../model/UserInterface");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!emailUser) {
        throw new Error("Email missing");
    }
    const idUser = yield UserInterface_1.User.findOne({ email: emailUser.email });
    const payload = {
        userId: idUser.id,
        userEmail: emailUser,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
});
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error("Token is missing");
    }
    else {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        const userLogged = yield UserInterface_1.User.findById(result.userId);
        return userLogged;
    }
});
exports.verifyToken = verifyToken;
