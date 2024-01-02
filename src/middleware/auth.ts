import { NextFunction, Response, Request } from "express";
import { verifyToken } from "./token";

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
      req.user = decodedInfo;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "You are not logged. Pleas logged to see the apge" });
  }
};
