import express, {Request, Response} from "express";
import { deleteBookings, getBookings, patchBookings, postBookings } from "../services/booking..ts";

export const bookingRouter = express.Router();

bookingRouter.get("/", async (req: Request, res: Response) => {
    const data = await getBookings()
    res.send(data);
});

bookingRouter.post("/", async (req: Request, res: Response) => {
    const data = await postBookings()
    res.send(data);
});


bookingRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchBookings()
    res.send(data);
});


bookingRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteBookings()
    res.send(data);
});
