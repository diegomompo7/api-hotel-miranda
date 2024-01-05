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
exports.deleteUser = exports.patchUser = exports.postUser = exports.getUsersId = exports.getUsers = void 0;
const UserInterface_1 = require("../model/UserInterface");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserInterface_1.User.find();
});
exports.getUsers = getUsers;
const getUsersId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserInterface_1.User.findById(id);
});
exports.getUsersId = getUsersId;
const postUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserInterface_1.User(userData);
    const document = (yield user.save());
    return document;
});
exports.postUser = postUser;
const patchUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    return yield UserInterface_1.User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
});
exports.patchUser = patchUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserInterface_1.User.findByIdAndDelete(id).lean();
});
exports.deleteUser = deleteUser;
