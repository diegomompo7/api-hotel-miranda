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
exports.deleteBooking = exports.patchBooking = exports.postBooking = exports.getBookingsId = exports.getBookings = void 0;
const BookingInterface_1 = require("../model/BookingInterface");
const getBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield BookingInterface_1.Booking.find().populate(["room"]);
});
exports.getBookings = getBookings;
const getBookingsId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield BookingInterface_1.Booking.findById(id).populate(["room"]);
});
exports.getBookingsId = getBookingsId;
const postBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = new BookingInterface_1.Booking(bookingData);
    const document = (yield booking.save());
    return document;
});
exports.postBooking = postBooking;
const patchBooking = (id, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield BookingInterface_1.Booking.findByIdAndUpdate(id, bookingData, { new: true, runValidators: true });
});
exports.patchBooking = patchBooking;
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield BookingInterface_1.Booking.findByIdAndDelete(id).lean();
});
exports.deleteBooking = deleteBooking;
