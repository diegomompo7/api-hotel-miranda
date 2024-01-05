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
exports.mongoConnect = void 0;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Cargar las variables de entorno desde el archivo .env
dotenv.config();
function mongoConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield mongoose.connect(process.env.DB_URL);
        }
        catch (error) {
            console.error(error);
            console.log("Error en la conexión, intentando conectar en 5s...");
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            setTimeout(mongoConnect, 5000);
            return null;
        }
    });
}
exports.mongoConnect = mongoConnect;
