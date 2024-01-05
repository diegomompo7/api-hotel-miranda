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
exports.deleteContact = exports.patchContact = exports.postContact = exports.getContactsId = exports.getContacts = void 0;
const ContactInterface_1 = require("../model/ContactInterface");
const getContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContactInterface_1.Contact.find();
});
exports.getContacts = getContacts;
const getContactsId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContactInterface_1.Contact.findById(id);
});
exports.getContactsId = getContactsId;
const postContact = (contactData) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = new ContactInterface_1.Contact(contactData);
    const document = (yield contact.save());
    return document;
});
exports.postContact = postContact;
const patchContact = (id, contactData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContactInterface_1.Contact.findByIdAndUpdate(id, contactData, { new: true, runValidators: true });
});
exports.patchContact = patchContact;
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContactInterface_1.Contact.findByIdAndDelete(id).lean();
});
exports.deleteContact = deleteContact;
