import express, {Request, Response} from "express";
import { deleteUsers, getUsers, patchUsers, postUsers } from "../services/user.ts";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
    const data = await getUsers()
    res.send(data);
});

userRouter.post("/", async (req: Request, res: Response) => {
    const data = await postUsers()
    res.send(data);
});


userRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchUsers()
    res.send(data);
});


userRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteUsers()
    res.send(data);
});
