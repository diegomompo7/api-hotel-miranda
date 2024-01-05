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
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("../services/login");
const token_1 = require("../middleware/token");
exports.loginRouter = express_1.default.Router();
exports.loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = yield (0, login_1.postLogin)(req.body);
    if (login) {
        const token = yield (0, token_1.generateToken)({ email: req.body.email });
        res.json(token);
    }
    else {
        res.json({ message: "Invalid username or password" });
    }
}));