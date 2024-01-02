import express, {Request, Response} from "express";
import { deleteUser, getUsers, getUsersId, patchUser, postUser } from "../services/user.ts";

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
    const users = await getUsers()
    res.json(users);
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await getUsersId(id)
    
    if (users) {
        res.json(users);
      } else {
        res.status(404).json({});
      }
});

usersRouter.post("/", async (req: Request, res: Response) => {
    const users = await postUser(req.body)
    res.json( [{success: "users create successfully"}]);
});


usersRouter.patch("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await patchUser(id, req.body)
    if (data) {
        res.json( [{success: "users updated successfully"}]);
      } else {
        res.status(404).json({});
    }
});


usersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteUser(id)
    if (data) {
        res.json( [{success: "users deleted successfully"}]);
      } else {
        res.status(404).json({});
    }
});
