import express, { NextFunction,  Response, Request,  ErrorRequestHandler } from "express";
import { bookingRouter } from "./booking";
import { roomRouter } from "./room";
import { contactRouter } from "./contact";
import { userRouter } from "./users";
import { loginRouter } from "./login";
import { isAuth } from "../middleware/auth";
import { verifyToken } from "../middleware/token";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const configureRoutes = (app: any): any => {
    // Rutas
    const router = express.Router();
  

    router.get("/", isAuth, (req: AuthenticatedRequest, res: Response) => {
      const user = req.user;
      console.log(user);
      res.json({ user });
      
    });

    router.get("*", (req: Request, res: Response) => {
      res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
  
    // Usamos las rutas
    app.use("/bookings", bookingRouter);
    app.use("/rooms", roomRouter);
    app.use("/contact", contactRouter);
    app.use("/users", userRouter);
    app.use("/login", loginRouter);
    app.use("/", router);


  
    return app;
  };