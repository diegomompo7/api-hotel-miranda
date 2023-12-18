import { NextFunction, Response, Request } from "express";
const jwt = require('jsonwebtoken');

export interface AuthenticatedRequest extends Request { 
    user?: any;
  }

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)

      console.log(user)

  
      req.user = user
  
      next()
    })
};