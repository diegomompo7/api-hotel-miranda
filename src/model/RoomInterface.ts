import Joi, { ObjectSchema } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IRoomCreate {
  photos: string[];
  roomType: string;
  roomNumber: string;
  description: string;
  offer: string;
  priceNight: number;
  discount: number | null;
  cancellation: string;
  amenities: string[];
  status: string;
}

export type IRoom = IRoomCreate & Document;

const bookingSchema = new Schema({
  photos: { type: Array, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true },
  description: { type: String, required: true },
  offer: { type: String, required: true },
  priceNight: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  cancellation: { type: String, required: true },
  amenities: { type: Array, required: true },
  status: { type: String, required: true },
});

export const schema: ObjectSchema<IRoom> = Joi.object({
  photo: Joi.array().items(Joi.string().domain()).required(),
  roomType: Joi.string()
    .valid("Single Bed", "Double Bed", "Double Superior", "Suite")
    .required(),
  roomNumber: Joi.string()
    .pattern(/^[abc] - [0-9]+$/)
    .required(),
  description: Joi.string().min(3).required(),
  offer: Joi.string().valid("YES", "NO").required(),
  priceNight: Joi.number().min(50).max(300).positive().required(),
  discount: Joi.number().max(50).positive().required(),
  cancellation: Joi.string().min(3).required(),
  amenities: Joi.array().items(Joi.string().min(3)).required(),
  status: Joi.string()
    .valid("Available", "Booked")
    .default("Available")
    .required(),
});

export const Room = mongoose.model<IRoomCreate>(
  "Rooms",
  bookingSchema,
  "rooms"
);
