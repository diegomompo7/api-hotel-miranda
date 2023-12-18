import express, {Request, Response} from "express";
import { deleteContacts, getContacts, patchContacts, postContacts } from "../services/contact.ts";

export const contactRouter = express.Router();

contactRouter.get("/", async (req: Request, res: Response) => {
    const data = await getContacts()
    res.send(data);
});

contactRouter.post("/", async (req: Request, res: Response) => {
    const data = await postContacts()
    res.send(data);
});


contactRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchContacts()
    res.send(data);
});


contactRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteContacts()
    res.send(data);
});
