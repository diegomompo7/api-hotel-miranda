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
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const booking_1 = require("../services/booking");
exports.bookingRouter = express_1.default.Router();
exports.bookingRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield (0, booking_1.getBookings)();
    res.send(bookings);
}));
exports.bookingRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const booking = yield (0, booking_1.getBookingsId)(id);
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({});
    }
}));
exports.bookingRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield (0, booking_1.postBooking)(req.body);
    res.send(booking);
}));
exports.bookingRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, booking_1.patchBooking)(id, req.body);
    if (data) {
        res.json(data);
    }
    else {
        res.status(404).json({});
    }
}));
exports.bookingRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, booking_1.deleteBooking)(id);
    if (data) {
        res.json([{ success: "booking deleted successfully" }]);
    }
    else {
        res.status(404).json({});
    }
}));
