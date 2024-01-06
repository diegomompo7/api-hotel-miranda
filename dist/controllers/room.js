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
exports.roomRouter = void 0;
const express_1 = __importDefault(require("express"));
const room_1 = require("../services/room");
exports.roomRouter = express_1.default.Router();
exports.roomRouter.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield (0, room_1.getRooms)();
        res.json(rooms);
    }
    catch (err) {
        next(err);
    }
}));
exports.roomRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const room = yield (0, room_1.getRoomsId)(id);
        res.json(room);
    }
    catch (err) {
        next(err);
    }
}));
exports.roomRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, room_1.postRoom)(req.body);
        res.json(room);
    }
    catch (err) {
        next(err);
    }
}));
exports.roomRouter.patch("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield (0, room_1.patchRoom)(id, req.body);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
}));
exports.roomRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, room_1.deleteRoom)(id);
        res.json([{ success: "room deleted successfully" }]);
    }
    catch (err) {
        next(err);
    }
}));
