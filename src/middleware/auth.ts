import { NextFunction, Response, Request } from "express";
import { verifyToken } from "./token";
import { UserInterface } from "../model/UserInterface";
const users = require('../data/users.json');

export interface AuthenticatedRequest extends Request { 
    user?: any;
  }

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = req.headers.authorization?.replace("Bearer ", "");
  
    if (token == null) return res.sendStatus(401)
  
    const decodedInfo = verifyToken(token);
    console.log(decodedInfo)

    const userLogged = users.find((user: UserInterface) => user.id === decodedInfo.userId);

     req.user = userLogged
     next()

  } 