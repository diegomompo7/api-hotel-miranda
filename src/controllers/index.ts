import express, { NextFunction,  Response, Request,  ErrorRequestHandler } from "express";
import { bookingRouter } from "./booking";
import { roomRouter } from "./room";
import { contactRouter } from "./contact";
import { userRouter } from "./users";
import { loginRouter } from "./login";
import { isAuth } from "../middleware/auth";
import { getContacts } from "../services/contact";

export const configureRoutes = (app: any): any => {
    // Rutas
    const router = express.Router();
  

    router.get("/", async (req:Request, res: Response) => {
      const data = await getContacts()
        res.send(data);
    });

    router.get("*", (req: Request, res: Response) => {
      res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
  
    // Usamos las rutas
    app.use("/bookings", isAuth, bookingRouter);
    app.use("/rooms", isAuth, roomRouter);
    app.use("/contact", isAuth, contactRouter);
    app.use("/users", isAuth, userRouter);
    app.use("/login", loginRouter);
    app.use("/", isAuth, router);


  
    return app;
  };