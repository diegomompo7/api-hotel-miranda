import { Room, IRoom } from "./RoomInterface";
import mongoose, {Document, Schema } from "mongoose";

export interface IBookingCreate {
  name: string;
  orderDate: string;
  check_in: string;
  hour_in: string
  check_out: string;
  hour_out: string
  room: IRoom;
  specialRequest: string;
  status: string;
}

export type IBooking = IBookingCreate & Document;

const bookingSchema = new Schema({
  name: {type: String, required: true},
  orderDate: { type: String, default: Date.now },
  check_in: { type: String, required: true},
  hour_in: { type: String, required: true},
  check_out: { type: String, required: true},
  hour_out: { type: String, required: true},
  room: {
    type: Schema.Types.ObjectId,
    ref: Room,
    required: true,

  },
  specialRequest: {type: String},
  status: {type: String, required: true},
})

export const Booking = mongoose.model<IBookingCreate>("Booking", bookingSchema, "bookings");