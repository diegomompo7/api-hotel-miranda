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
const UserInterface_1 = require("../model/UserInterface");
const mongo_repository_1 = require("../mongo-repository");
const es_1 = require("@faker-js/faker/locale/es");
function seedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongo_repository_1.mongoConnect)();
            console.log("Connected correctly to server");
            yield UserInterface_1.User.collection.drop();
            console.log("Users deleted successfully");
            for (let i = 0; i < 15; i++) {
                const fullName = es_1.faker.person.fullName(); // Rowan Nikolaus
                const firstName = fullName.split(" ")[0].toLowerCase();
                const lastName = fullName.split(" ")[1].toLowerCase();
                const email = es_1.faker.internet.email({ firstName: firstName, lastName: lastName });
                const job = es_1.faker.helpers.arrayElement(['Manager', 'Recepcionist', 'Room Service']);
                const document = new UserInterface_1.User({
                    photo: es_1.faker.internet.avatar(),
                    fullName: fullName,
                    job: job,
                    email: email,
                    phone: es_1.faker.phone.number().replace(/\D/g, ''),
                    startDate: es_1.faker.date.past({ years: 1, refDate: '2024-01-02T00:00:00.000Z' }).toLocaleDateString()
                        .replace(/\//g, '-'),
                    descriptionJob: job,
                    status: es_1.faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
                    password: es_1.faker.internet.password({ memorable: true }),
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
