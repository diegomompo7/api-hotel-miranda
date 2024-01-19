import express, { Request, Response } from "express";
import { postLogin } from "../services/login";
import { generateToken } from "../middleware/token";

export const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const login = await postLogin(req.body);

  if (login) {
    const token = await generateToken({ email: req.body.email });
    res.json(token);
  } else {
    res.status(404).json({ message: "Invalid username or password" });
  }
});
