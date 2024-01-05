import express, {Response, Request } from "express";
import { bookingRouter } from "./booking";
import { roomRouter } from "./room";
import { contactRouter } from "./contact";
import { usersRouter } from "./users";
import { loginRouter } from "./login";
import { isAuth } from "../middleware/auth";
import { getContacts } from "../services/contact";
import { publicRouter } from "./public";
import { mongoConnect} from "../mongo-repository";
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const configureRoutes = async (app: any): Promise<any> => {
    // Rutas
    await mongoConnect()
    const router = express.Router();

    router.get("/", async (res: Response) => {
      const data = await getContacts()
        res.json(data);
    });

    router.get("/header", isAuth, (req: AuthenticatedRequest, res: Response) => {
      const user = req.user;
      res.json({ photo: user.photo, fullName: user.fullName, email: user.email});
    });

    router.get("*", ( res: Response) => {
      res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
  
    // Usamos las rutas
    app.use("/bookings", isAuth,  bookingRouter);
    app.use("/rooms", isAuth, roomRouter);
    app.use("/contact", isAuth, contactRouter);
    app.use("/users", isAuth, usersRouter);
    app.use("/login", loginRouter);
    app.use("/public", publicRouter);
    app.use("/", isAuth, router);

  
    return app;
  };
