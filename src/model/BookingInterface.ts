import { Rooms, IRoom } from "./RoomInterface";
import mongoose, {Document, Schema } from "mongoose";

export interface IBookingCreate {
  name: string;
  orderDate: Date;
  check_in: Date;
  hour_in: string;
  check_out: Date;
  hour_out: string;
  room: IRoom;
  specialRequest: string;
}

export type IBooking = IBookingCreate & Document;

const bookingSchema = new Schema({
  name: {type: String, required: true},
  orderDate: Date.now,
  check_in: {type: Date, required: true},
  hour_in: {type: String, required: true},
  check_out: {type: Date, required: true},
  hour_out: {type: String, required: true},
  room: {
    type: Schema.Types.ObjectId,
    ref: Rooms,
    required: true,

  },
  specialRequest: {type: String},
  status: {type: String, required: true},
})

export const Booking = mongoose.model<IBookingCreate>("Booking", bookingSchema, "bookings");