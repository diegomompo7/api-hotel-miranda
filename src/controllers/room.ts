import express, {Request, Response} from "express";
import { deleteRooms, getRoomId, getRooms, patchRooms, postRooms } from "../services/room";

export const roomRouter = express.Router();

roomRouter.get("/", async (req: Request, res: Response) => {
    const data = await getRooms()
    res.json(data);
});

roomRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await getRoomId(id)
    res.json(data);
});

roomRouter.post("/", async (req: Request, res: Response) => {
    const data = await postRooms()
    res.json([{success: "rooms create successfully"}]);
});


roomRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchRooms()
    res.json([{success: "rooms updated successfully"}]);
});


roomRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteRooms()
    res.json([{success: "rooms deleted successfully"}]);
});
