import express, {Request, Response} from "express";
import { deleteContacts, getContactId, getContacts, patchContacts, postContacts } from "../services/contact.ts";

export const contactRouter = express.Router();

contactRouter.get("/", async (req: Request, res: Response) => {
    const data = await getContacts()
    res.json(data);
});

contactRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await getContactId(id)
    res.json(data);
});

contactRouter.post("/", async (req: Request, res: Response) => {
    const data = await postContacts()
    res.json([{success: "contact created successfully"}]);
});


contactRouter.patch("/:id", async (req: Request, res: Response) => {
    const data = await patchContacts()
    res.json([{success: "contact updated successfully"}]);
});


contactRouter.delete("/:id", async (req: Request, res: Response) => {
    const data = await deleteContacts()
    res.json([{success: "contact deleted successfully"}]);
});
