import { NextFunction, Response, Request } from "express";
import { verifyToken } from "./token";
import { UserInterface } from "../model/UserInterface";
const users = require("../data/users.json");

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token == null)
      return res
        .status(401)
        .json({ message: "You are not logged. Pleas logged to see the apge" });

    try {
      const decodedInfo = verifyToken(token);

      const userLogged = users.find(
        (user: UserInterface) => user.id === decodedInfo.userId
      );

      req.user = userLogged;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res
      .status(401)
      .json({ message: "You are not logged. Pleas logged to see the apge" });
  }
};
