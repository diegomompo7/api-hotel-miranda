import express, {Request, Response} from "express";
import { deleteRoom, getRooms, getRoomsId, patchRoom, postRoom } from "../services/room";

export const roomRouter = express.Router();

roomRouter.get("/", async (res: Response) => {
    const rooms = await getRooms()
    res.json(rooms);
});

roomRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const room = await getRoomsId(id)
    
    if (room) {
        res.json(room);
      } else {
        res.status(404).json({"message": "Room not found"});
      }
});

roomRouter.post("/", async (req: Request, res: Response) => {
    const room = await postRoom(req.body)
    res.json( room);
});


roomRouter.patch("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await patchRoom(id, req.body)
    if (data) {
        res.json( data);
      } else {
        res.status(404).json({"message": "Room not found"});
    }
});


roomRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteRoom(id)
    if (data) {
        res.json( [{success: "room deleted successfully"}]);
      } else {
        res.status(404).json({"message": "Room not found"});
    }
});
