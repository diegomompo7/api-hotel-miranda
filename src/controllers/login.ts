import express, {Request, Response} from "express";
import { postLogin } from "../services/login.ts";
import { generateToken } from "../middleware/token.ts";
import { isAuth } from "../middleware/auth.ts";

export const loginRouter = express.Router();



loginRouter.post("/", async (req: Request, res: Response) => {
    const login = await postLogin(req.body.email ,  req.body.password)
    console.log(req)

    if(login){
        const token = generateToken({ email: req.body.email });
        res.json(token);
    } else{
        res.json({message: "Invalid username or password"});
    }
});

loginRouter.get("/", (req: Request, res: Response) => {
   res.json({
    name: "Hotel Miranda",
    endpoints: {
        "/login": [
            "GET LOGIN",
            "POST LOGIN"
        ],
        "/rooms" : [
            "GET ROOMS",
            "POST ROOM",
            "PATCH ROOM",
            "DELETE ROOM"
        ],
        "/bookings" : [
            "GET BOOKINGS",
            "POST BOOKING",
            "PATCH BOOKING",
            "DELETE BOOKING"
        ],
        "/bookings/:id" : [
            "GET BOOKING ID",
        ],
        "/contact": [
            "GET CONTACTS",
            "POST CONTACT",
            "PATCH CONTACT",
            "DELETE CONTACT"
        ],
        "/users" : [
            "GET USERS",
            "POST USER",
            "PATCH USER",
            "DELETE USER"
        ],
        "/header" : [
            "GET USER LOGGED",
        ],
    },

   })
});