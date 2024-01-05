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
exports.isAuth = void 0;
const token_1 = require("./token");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (token == null)
            return res
                .status(401)
                .json({ message: "You are not logged. Pleas logged to see the page" });
        try {
            const decodedInfo = yield (0, token_1.verifyToken)(token);
            req.user = decodedInfo;
            next();
            return null;
        }
        catch (error) {
            return res.status(403).json({ message: "Forbidden: Invalid Token" });
        }
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: "You are not logged. Pleas logged to see the page" });
    }
});
exports.isAuth = isAuth;
