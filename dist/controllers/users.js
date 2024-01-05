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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../services/user");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.get("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_1.getUsers)();
    res.json(users);
}));
exports.usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const users = yield (0, user_1.getUsersId)(id);
    if (users) {
        res.json(users);
    }
    else {
        res.status(404).json({ "message": "User not found" });
    }
}));
exports.usersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_1.postUser)(req.body);
    res.json(users);
}));
exports.usersRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, user_1.patchUser)(id, req.body);
    if (data) {
        res.json([{ success: "users updated successfully" }]);
    }
    else {
        res.status(404).json({ "message": "User not found" });
    }
}));
exports.usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, user_1.deleteUser)(id);
    if (data) {
        res.json([{ success: "users deleted successfully" }]);
    }
    else {
        res.status(404).json({ "message": "User not found" });
    }
}));
