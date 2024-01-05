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
exports.roomRouter.get("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield (0, room_1.getRooms)();
    res.json(rooms);
}));
exports.roomRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const room = yield (0, room_1.getRoomsId)(id);
    if (room) {
        res.json(room);
    }
    else {
        res.status(404).json({ "message": "Room not found" });
    }
}));
exports.roomRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield (0, room_1.postRoom)(req.body);
    res.json(room);
}));
exports.roomRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, room_1.patchRoom)(id, req.body);
    if (data) {
        res.json(data);
    }
    else {
        res.status(404).json({ "message": "Room not found" });
    }
}));
exports.roomRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, room_1.deleteRoom)(id);
    if (data) {
        res.json([{ success: "room deleted successfully" }]);
    }
    else {
        res.status(404).json({ "message": "Room not found" });
    }
}));
