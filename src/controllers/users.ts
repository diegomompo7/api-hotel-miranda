import express, {Request, Response} from "express";
import { deleteUsers, getUserId, getUsers, patchUsers, postUsers } from "../services/user.ts";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
    const data = await getUsers()
    res.json(data);
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await getUserId(id)
    res.json(data);
});

userRouter.post("/", async (req: Request, res: Response) => {
    const data = await postUsers()
    res.json( [{success: "user created successfully"}]);
});


userRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchUsers()
    res.json( [{success: "user updated successfully"}]);
});


userRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteUsers()
    res.json( [{success: "user deleted successfully"}]);
});
