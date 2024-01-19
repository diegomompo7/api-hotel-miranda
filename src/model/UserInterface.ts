import Joi, { ObjectSchema } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IUserCreate {
  photo: string;
  fullName: string;
  job: string;
  email: string;
  phone: string;
  startDate: string;
  descriptionJob: string;
  status: string;
  password: string;
}

export type IUser = IUserCreate & Document;

const userSchema = new Schema({
  photo: { type: String, required: true },
  fullName: { type: String, required: true },
  job: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  startDate: { type: String, default: Date.now, required: true },
  descriptionJob: { type: String, required: true },
  status: { type: String, required: true },
  password: { type: String, required: true },
});

export const schema: ObjectSchema<IUser> = Joi.object({
  photo: Joi.string().domain().required(),
  fullName: Joi.string().min(3).required(),
  job: Joi.string().valid("Manager", "Recepcionist", "Room Service"),
  email: Joi.string().email().required(),
  startDate: Joi.string().default(Date.now()).required(),
  descriptionJob: Joi.string().min(3).required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE").required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
});

export const User = mongoose.model<IUserCreate>("User", userSchema, "users");
