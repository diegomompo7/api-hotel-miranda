import express, {Request, Response} from "express";
import { deleteUser, getUsers, getUsersId, patchUser, postUser } from "../services/user";

export const usersRouter = express.Router();

usersRouter.get("/", async ( res: Response) => {
    const users = await getUsers()
    res.json(users);
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await getUsersId(id)
    
    if (users) {
        res.json(users);
      } else {
        res.status(404).json({"message": "User not found"});
      }
});

usersRouter.post("/", async (req: Request, res: Response) => {
    const users = await postUser(req.body)
    res.json( users);
});


usersRouter.patch("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await patchUser(id, req.body)
    if (data) {
        res.json( [{success: "users updated successfully"}]);
      } else {
        res.status(404).json({"message": "User not found"});
    }
});


usersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteUser(id)
    if (data) {
        res.json( [{success: "users deleted successfully"}]);
      } else {
        res.status(404).json({"message": "User not found"});
    }
});
