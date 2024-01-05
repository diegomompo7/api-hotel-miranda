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
const RoomInterface_1 = require("../model/RoomInterface");
const mongo_repository_1 = require("../mongo-repository");
const es_1 = require("@faker-js/faker/locale/es");
function seedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongo_repository_1.mongoConnect)();
            console.log("Connected correctly to server");
            yield RoomInterface_1.Room.collection.drop();
            console.log("Rooms deleted successfully");
            for (let i = 0; i < 15; i++) {
                const offer = es_1.faker.helpers.arrayElement(["YES", "NO"]);
                const document = new RoomInterface_1.Room({
                    photos: [es_1.faker.image.url(), es_1.faker.image.url(), es_1.faker.image.url()],
                    roomType: es_1.faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
                    roomNumber: es_1.faker.lorem.word() + '-' + es_1.faker.number.int({ max: 500 }),
                    description: es_1.faker.lorem.paragraph(2),
                    offer: offer,
                    priceNight: es_1.faker.commerce.price({ min: 50, max: 300, dec: 2 }),
                    discount: offer === "YES" ? es_1.faker.number.int({ min: 10, max: 50 }) : 0,
                    cancellation: es_1.faker.lorem.paragraph(2),
                    amenities: [es_1.faker.lorem.word(), es_1.faker.lorem.word(), es_1.faker.lorem.word()],
                    status: "Available"
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
