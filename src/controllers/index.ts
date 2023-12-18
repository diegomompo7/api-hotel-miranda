import express, { type NextFunction, type Response, type Request, type ErrorRequestHandler } from "express";
import { bookingRouter } from "./booking";

export const configureRoutes = (app: any): any => {
    // Rutas
    const router = express.Router();
  
    router.get("*", (req: Request, res: Response) => {
      res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
  
    // Usamos las rutas
    app.use("/bookings", bookingRouter);
    app.use("/rooms", bookingRouter);

  
    return app;
  };