import express, {Request, Response} from "express";
import { deleteRooms, getRooms, patchRooms, postRooms } from "../services/room";

export const roomRouter = express.Router();

roomRouter.get("/", async (req: Request, res: Response) => {
    const data = await getRooms()
    res.send(data);
});

roomRouter.post("/", async (req: Request, res: Response) => {
    const data = await postRooms()
    res.send(data);
});


roomRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchRooms()
    res.send(data);
});


roomRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteRooms()
    res.send(data);
});
