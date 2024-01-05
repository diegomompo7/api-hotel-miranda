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
const mongoose_1 = __importDefault(require("mongoose"));
const ContactInterface_1 = require("../model/ContactInterface");
const mongo_repository_1 = require("../mongo-repository");
const es_1 = require("@faker-js/faker/locale/es");
function seedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongo_repository_1.mongoConnect)();
            console.log("Connected correctly to server");
            yield ContactInterface_1.Contact.collection.drop();
            console.log("Contacts deleted successfully");
            for (let i = 0; i < 15; i++) {
                const firstName = es_1.faker.person.firstName();
                const lastName = es_1.faker.person.lastName();
                const email = es_1.faker.internet.email({ firstName: firstName, lastName: lastName });
                const document = new ContactInterface_1.Contact({
                    userImg: es_1.faker.image.avatar(),
                    name: firstName,
                    surname: lastName,
                    email: email,
                    phone: es_1.faker.phone.number().replace(/\D/g, ''),
                    date: es_1.faker.date.past({ years: 1, refDate: '2024-01-02T00:00:00.000Z' }),
                    subject: es_1.faker.lorem.sentence(5),
                    message: es_1.faker.lorem.paragraph(2),
                    stars: es_1.faker.number.int({ min: 1, max: 5 }),
                    is_archived: false
                });
                yield document.save();
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            yield mongoose_1.default.disconnect();
        }
    });
}
seedDB();
