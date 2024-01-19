import express, { NextFunction, Request, Response } from "express";
import {
  deleteRoom,
  getRooms,
  getRoomsId,
  patchRoom,
  postRoom,
} from "../services/room";

export const roomRouter = express.Router();

roomRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    const rooms = await getRooms();
    try {
      if (rooms) {
        res.json(rooms);
      } else {
        res.json({ message: "There aren't rooms on the table" });
      }
    } catch (err) {
      next(err);
    }
  }
);

roomRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const room = await getRoomsId(id);
      if (room) {
        res.json(room);
      } else {
        res.status(404).json({ message: "room not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

roomRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await postRoom(req.body);
    try {
      res.json(room);
    } catch (err) {
      next(err);
    }
  }
);

roomRouter.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await patchRoom(id, req.body);
    try {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "room not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

roomRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await deleteRoom(id);
    try {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "room not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
