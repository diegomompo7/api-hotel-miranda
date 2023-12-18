import express, { NextFunction,  Response, Request,  ErrorRequestHandler } from "express";
import { bookingRouter } from "./booking";
import { roomRouter } from "./room";
import { contactRouter } from "./contact";

export const configureRoutes = (app: any): any => {
    // Rutas
    const router = express.Router();
  
    router.get("*", (req: Request, res: Response) => {
      res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
  
    // Usamos las rutas
    app.use("/bookings", bookingRouter);
    app.use("/rooms", roomRouter);
    app.use("/contact", contactRouter);


  
    return app;
  };