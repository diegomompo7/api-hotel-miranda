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
exports.contactRouter = void 0;
const express_1 = __importDefault(require("express"));
const contact_1 = require("../services/contact");
exports.contactRouter = express_1.default.Router();
exports.contactRouter.get("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield (0, contact_1.getContacts)();
    res.json(contacts);
}));
exports.contactRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const contact = yield (0, contact_1.getContactsId)(id);
    if (contact) {
        res.json(contact);
    }
    else {
        res.status(404).json({ "message": "Contact not found" });
    }
}));
exports.contactRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield (0, contact_1.postContact)(req.body);
    res.json(contact);
}));
exports.contactRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, contact_1.patchContact)(id, req.body);
    if (data) {
        res.json(data);
    }
    else {
        res.status(404).json({});
    }
}));
exports.contactRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, contact_1.deleteContact)(id);
    if (data) {
        res.json([{ success: "contact deleted successfully" }]);
    }
    else {
        res.status(404).json({ "message": "Contact not found" });
    }
}));
