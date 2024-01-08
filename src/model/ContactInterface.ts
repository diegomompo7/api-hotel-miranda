import mongoose, {Document, Schema } from "mongoose";

export interface IContactCreate {
  userImg: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  date: string;
  subject: string;
  message: string;
  stars: number;
  is_archived: boolean;
}

export type IContact = IContactCreate & Document;

const contactSchema = new Schema({
  userImg: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: Number, required: true},
  date: {type: String, default: Date.now, required: true},
  subject: {type: String, required: true},
  message: {type: String, required: true},
  stars: {type: Number, required: true},
  is_archived: {type: Boolean},
})

export const Contact = mongoose.model<IContactCreate>("Contact", contactSchema, "contacts");