import express, {Request, Response} from "express";
import { deleteContact, getContacts, getContactsId, patchContact, postContact } from "../services/contact";
export const contactRouter = express.Router();

contactRouter.get("/", async (res: Response) => {
    const contacts = await getContacts()
    res.json(contacts);
});

contactRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const contact = await getContactsId(id)
    
    if (contact) {
        res.json(contact);
      } else {
        res.status(404).json({"message": "Contact not found"});
      }
});

contactRouter.post("/", async (req: Request, res: Response) => {
    const contact = await postContact(req.body)
    res.json( contact);
});


contactRouter.patch("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await patchContact(id, req.body)
    if (data) {
      res.json(data);
      } else {
        res.status(404).json({});
    }
});


contactRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteContact(id)
    if (data) {
        res.json( [{success: "contact deleted successfully"}]);
      } else {
        res.status(404).json({"message": "Contact not found"});
    }
});
