import express, { NextFunction, Request, Response } from "express";
import {
  deleteUser,
  getUsers,
  getUsersId,
  patchUser,
  postUser,
} from "../services/user";

export const usersRouter = express.Router();

usersRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getUsers();
      if (users) {
        res.json(users);
      } else {
        res.json({ message: "There aren't users on the table" });
      }
    } catch (err) {
      next(err);
    }
  }
);

usersRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await getUsersId(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await postUser(req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

usersRouter.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await patchUser(id, req.body);
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

usersRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await deleteUser(id);
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
