import express, {Request, Response} from "express";
import { postLogin } from "../services/login.ts";
import { generateToken } from "../middleware/token.ts";
import { isAuth } from "../middleware/auth.ts";

export const loginRouter = express.Router();

interface AuthenticatedRequest extends Request {
    user?: any;
  }
  


loginRouter.post("/", async (req: Request, res: Response) => {
    const login = await postLogin(req.body.email ,  req.body.password)

    if(login){
        const token = generateToken({ email: req.body.email });
        res.json(token);
    } else{
        res.json({message: "Invalid username or password"});
    }
});

loginRouter.get("/", isAuth, (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    console.log(user);
    res.json({ photo: user.photo, fullName: user.fullName, email: user.email});
    
  });