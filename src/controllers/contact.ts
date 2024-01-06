import express, {NextFunction, Request, Response} from "express";
import { deleteContact, getContacts, getContactsId, patchContact, postContact } from "../services/contact";

export const contactRouter = express.Router();

contactRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await getContacts()
    res.json(contacts);
  }catch (err) {
      next(err);
  }
});

contactRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const contact = await getContactsId(id)
    res.json(contact);
    }catch (err) {
      next(err);
  }
});

contactRouter.post("/", async (req: Request, res: Response,next: NextFunction) => {
  try {
    const contact = await postContact(req.body)
    res.json( contact);
  }catch (err) {
    next(err);
}
});


contactRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const data = await patchContact(id, req.body)
    res.json( data);
  }catch (err) {
    next(err);
}
});


contactRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await deleteContact(id)
    res.json( [{success: "contact deleted successfully"}]);
  }catch (err) {
    next(err);
}
});
