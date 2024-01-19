import express, { NextFunction, Request, Response } from "express";
import {
  deleteContact,
  getContacts,
  getContactsId,
  patchContact,
  postContact,
} from "../services/contact";

export const contactRouter = express.Router();

contactRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    const contacts = await getContacts();
    try {
      if (contacts) {
        res.json(contacts);
      } else {
        res.json({ message: "There aren't contacts on the table" });
      }
    } catch (err) {
      next(err);
    }
  }
);

contactRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const contact = await getContactsId(id);
    try {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).json({ message: "contact not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

contactRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await postContact(req.body);
    try {
      res.json(contact);
    } catch (err) {
      next(err);
    }
  }
);

contactRouter.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await patchContact(id, req.body);
    try {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "contact not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

contactRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await deleteContact(id);
    try {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "contact not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
