import express, {NextFunction, Request, Response} from "express";
import { deleteBooking, getBookings, getBookingsId, patchBooking, postBooking } from "../services/booking";

export const bookingRouter = express.Router();

bookingRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getBookings()
    res.json(bookings);
  }catch (err) {
      next(err);
  }
});

bookingRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const booking = await getBookingsId(id)
    res.json(booking);
    }catch (err) {
      next(err);
  }
});

bookingRouter.post("/", async (req: Request, res: Response,next: NextFunction) => {
  try {
    const booking = await postBooking(req.body)
    res.json( booking);
  }catch (err) {
    next(err);
}
});


bookingRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const data = await patchBooking(id, req.body)
    res.json( data);
  }catch (err) {
    next(err);
}
});


bookingRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await deleteBooking(id)
    res.json( [{success: "booking deleted successfully"}]);
  }catch (err) {
    next(err);
}
});
