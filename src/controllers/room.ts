import express, {NextFunction, Request, Response} from "express";
import { deleteRoom, getRooms, getRoomsId, patchRoom, postRoom } from "../services/room";

export const roomRouter = express.Router();

roomRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await getRooms()
    res.json(rooms);
  }catch (err) {
      next(err);
  }
});

roomRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const room = await getRoomsId(id)
    res.json(room);
    }catch (err) {
      next(err);
  }
});

roomRouter.post("/", async (req: Request, res: Response,next: NextFunction) => {
  try {
    const room = await postRoom(req.body)
    res.json( room);
  }catch (err) {
    next(err);
}
});


roomRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const data = await patchRoom(id, req.body)
    res.json( data);
  }catch (err) {
    next(err);
}
});


roomRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await deleteRoom(id)
    res.json( [{success: "room deleted successfully"}]);
  }catch (err) {
    next(err);
}
});
