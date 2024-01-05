"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.publicRouter = express_1.default.Router();
exports.publicRouter.get("/", (res) => {
    res.json({
        name: "Hotel Miranda",
        endpoints: {
            "/login": [
                "GET LOGIN",
                "POST LOGIN"
            ],
            "/rooms": [
                "GET ROOMS",
                "POST ROOM",
                "PATCH ROOM",
                "DELETE ROOM"
            ],
            "/bookings": [
                "GET BOOKINGS",
                "POST BOOKING",
                "PATCH BOOKING",
                "DELETE BOOKING"
            ],
            "/bookings/:id": [
                "GET BOOKING ID",
            ],
            "/contact": [
                "GET CONTACTS",
                "POST CONTACT",
                "PATCH CONTACT",
                "DELETE CONTACT"
            ],
            "/users": [
                "GET USERS",
                "POST USER",
                "PATCH USER",
                "DELETE USER"
            ],
            "/header": [
                "GET USER LOGGED",
            ],
        },
    });
});
