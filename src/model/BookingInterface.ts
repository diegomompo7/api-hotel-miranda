import { Room, IRoom } from "./RoomInterface";
import mongoose, { Document, Schema } from "mongoose";
import Joi, { ObjectSchema } from "joi";

export interface IBookingCreate {
  name: string;
  orderDate: string;
  check_in: string;
  hour_in: string;
  check_out: string;
  hour_out: string;
  room_id: IRoom;
  specialRequest: string;
  status: string;
}

export type IBooking = IBookingCreate & Document;

const bookingSchema = new Schema({
  name: { type: String, required: true },
  orderDate: { type: String, default: Date.now },
  check_in: { type: String, required: true },
  hour_in: { type: String, required: true },
  check_out: { type: String, required: true },
  hour_out: { type: String, required: true },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: Room,
    required: true,
  },
  specialRequest: { type: String },
  status: { type: String, required: true },
});

export const schema: ObjectSchema<IBooking> = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  orderDate: Joi.date().required(),
  check_in: Joi.date().required(),
  hour_in: Joi.string()
    .pattern(/^[0-2][0-9]:[0-59]+$/)
    .required(),
  check_out: Joi.date().greater(Joi.ref("check_in")).required(),
  hour_out: Joi.string()
    .pattern(/^[0-2][0-9]:[0-59]+$/)
    .required(),
  room_id: Joi.number().required(),
  specialRequest: Joi.string().min(3),
  status: Joi.string()
    .valid("Check In", "Check Out", "In Progress")
    .default("Check In")
    .required(),
});

export const Booking = mongoose.model<IBookingCreate>(
  "Booking",
  bookingSchema,
  "bookings"
);
