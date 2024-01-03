import { Room, IRoom } from "./RoomInterface";
import mongoose, {Document, Schema } from "mongoose";

export interface IBookingCreate {
  name: string;
  orderDate: Date;
  dateIn: Date;
  dateOut: string;
  room: IRoom;
  specialRequest: string;
  status: string;
}

export type IBooking = IBookingCreate & Document;

const bookingSchema = new Schema({
  name: {type: String, required: true},
  orderDate: { type: Date, default: Date.now },
  dateIn: {type: Date, required: true},
  dateOut: {type: Date, required: true},
  room: {
    type: Schema.Types.ObjectId,
    ref: Room,
    required: true,

  },
  specialRequest: {type: String},
  status: {type: String, required: true},
})

export const Booking = mongoose.model<IBookingCreate>("Booking", bookingSchema, "bookings");