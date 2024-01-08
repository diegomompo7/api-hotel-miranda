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
const BookingInterface_1 = require("../model/BookingInterface");
const mongo_repository_1 = require("../mongo-repository");
const es_1 = require("@faker-js/faker/locale/es");
const RoomInterface_1 = require("../model/RoomInterface");
function seedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongo_repository_1.mongoConnect)();
            console.log("Connected correctly to server");
            const rooms = yield RoomInterface_1.Room.find();
            if (!rooms.length) {
                console.error("No rooms found");
                return;
            }
            yield BookingInterface_1.Booking.collection.drop();
            console.log("Bookings deleted successfully");
            for (let i = 0; i < 15; i++) {
                const fullName = es_1.faker.person.fullName();
                const checkIn = es_1.faker.date.past({ years: 1, refDate: '2024-01-31' }).toLocaleDateString().replace(/\//g, '-');
                const checkOut = es_1.faker.date.soon({ days: 5, refDate: checkIn }).toLocaleDateString().replace(/\//g, '-');
                const document = new BookingInterface_1.Booking({
                    name: fullName,
                    orderDate: new Date(Date.now()).toLocaleDateString().replace(/\//g, '-'),
                    phone: es_1.faker.phone.number().replace(/\D/g, ''),
                    check_in: checkIn,
                    hour_in: es_1.faker.date.past().toLocaleTimeString(),
                    check_out: checkOut,
                    hour_out: es_1.faker.date.soon().toLocaleTimeString(),
                    room: rooms[Math.floor(Math.random() * rooms.length - 1)],
                    specialRequest: es_1.faker.lorem.paragraph(2),
                    status: "Check In"
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
