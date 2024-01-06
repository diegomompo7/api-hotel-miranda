import express, { NextFunction, Request, Response } from "express";
import {
  deleteBooking,
  getBookings,
  getBookingsId,
  patchBooking,
  postBooking,
} from "../services/booking";

export const bookingRouter = express.Router();

bookingRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    const bookings = await getBookings();
    try {
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  }
);

bookingRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const booking = await getBookingsId(id);
    try {
      if(booking){
        res.json(booking);
        }else {
          res.status(404).json({"message": "booking not found"});
      }
    } catch (err) {
      next(err);
    }
  }
);

bookingRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const booking = await postBooking(req.body);
    try {
      res.json(booking);
    } catch (err) {
      next(err);
    }
  }
);

bookingRouter.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await patchBooking(id, req.body);
    try {
      if(data){
        res.json(data);
        }else {
          res.status(404).json({"message": "booking not found"});
      }
    } catch (err) {
      next(err);
    }
  }
);

bookingRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await deleteBooking(id);
    try {
      if(data){
        res.json(data);
        }else {
          res.status(404).json({"message": "booking not found"});
      }
    } catch (err) {
      next(err);
    }
  }
);
