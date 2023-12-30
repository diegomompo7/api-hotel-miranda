import express, {Request, Response} from "express";
import { deleteBookings, getBookings, getBookingsId, patchBookings, postBookings } from "../services/booking..ts";

export const bookingRouter = express.Router();

bookingRouter.get("/", async (req: Request, res: Response) => {
    const bookings = await getBookings()
    res.json(bookings);
});

bookingRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const booking = await getBookingsId(id)
    
    if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({});
      }
});

bookingRouter.post("/", async (req: Request, res: Response) => {
    const booking = await postBookings(req.body)
    res.json( [{success: "booking create successfully"}]);
});


bookingRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchBookings()
    res.json( [{success: "booking update successfully"}]);
});


bookingRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteBookings()
    res.json( [{success: "booking deleted successfully"}]);
});
