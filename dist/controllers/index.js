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
exports.configureRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_1 = require("./booking");
const room_1 = require("./room");
const contact_1 = require("./contact");
const users_1 = require("./users");
const login_1 = require("./login");
const auth_1 = require("../middleware/auth");
const contact_2 = require("../services/contact");
const public_1 = require("./public");
const mongo_repository_1 = require("../mongo-repository");
const configureRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    // Rutas
    yield (0, mongo_repository_1.mongoConnect)();
    const router = express_1.default.Router();
    router.get("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, contact_2.getContacts)();
        res.json(data);
    }));
    router.get("/header", auth_1.isAuth, (req, res) => {
        const user = req.user;
        res.json({ photo: user.photo, fullName: user.fullName, email: user.email });
    });
    router.get("*", (res) => {
        res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
    // Usamos las rutas
    app.use("/bookings", auth_1.isAuth, booking_1.bookingRouter);
    app.use("/rooms", auth_1.isAuth, room_1.roomRouter);
    app.use("/contact", auth_1.isAuth, contact_1.contactRouter);
    app.use("/users", auth_1.isAuth, users_1.usersRouter);
    app.use("/login", login_1.loginRouter);
    app.use("/public", public_1.publicRouter);
    app.use("/", auth_1.isAuth, router);
    return app;
});
exports.configureRoutes = configureRoutes;
