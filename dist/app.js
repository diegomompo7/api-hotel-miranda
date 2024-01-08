"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const controllers_1 = require("./controllers");
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const port = 3001;
// Configuración del server
exports.app = (0, express_1.default)();
exports.app.use(cors());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.get('/', function (_req, res, _next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' });
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
(0, controllers_1.configureRoutes)(exports.app);
