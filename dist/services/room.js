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
exports.deleteRoom = exports.patchRoom = exports.postRoom = exports.getRoomsId = exports.getRooms = void 0;
const RoomInterface_1 = require("../model/RoomInterface");
const getRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield RoomInterface_1.Room.find();
});
exports.getRooms = getRooms;
const getRoomsId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield RoomInterface_1.Room.findById(id);
});
exports.getRoomsId = getRoomsId;
const postRoom = (roomData) => __awaiter(void 0, void 0, void 0, function* () {
    const room = new RoomInterface_1.Room(roomData);
    const document = (yield room.save());
    return document;
});
exports.postRoom = postRoom;
const patchRoom = (id, roomData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield RoomInterface_1.Room.findByIdAndUpdate(id, roomData, { new: true, runValidators: true });
});
exports.patchRoom = patchRoom;
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield RoomInterface_1.Room.findByIdAndDelete(id).lean();
});
exports.deleteRoom = deleteRoom;
