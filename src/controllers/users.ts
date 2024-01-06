import express, {NextFunction, Request, Response} from "express";
import { deleteUser, getUsers, getUsersId, patchUser, postUser } from "../services/user";

export const usersRouter = express.Router();

usersRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers()
    res.json(users);
  }catch (err) {
      next(err);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await getUsersId(id)
    res.json(user);
    }catch (err) {
      next(err);
  }
});

usersRouter.post("/", async (req: Request, res: Response,next: NextFunction) => {
  try {
    const user = await postUser(req.body)
    res.json( user);
  }catch (err) {
    next(err);
}
});


usersRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const data = await patchUser(id, req.body)
    res.json( data);
  }catch (err) {
    next(err);
}
});


usersRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await deleteUser(id)
    res.json( [{success: "user deleted successfully"}]);
  }catch (err) {
    next(err);
}
});
