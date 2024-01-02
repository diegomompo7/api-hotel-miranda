import mongoose, {Document, Schema } from "mongoose";

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
  photos: {type: Array, required: true},
  roomType: {type: String, required: true},
  roomNumber: {type: String, required: true},
  description: {type: String, required: true},
  offer: {type: String, required: true},
  priceNight: {type: Number, required: true},
  discount: {type: Number, default: 0},
  cancellation: {type: String, required: true},
  amenities: {type: Array, required: true},
  status: {type: String, required: true},
})

export const Room = mongoose.model<IRoomCreate>("Rooms", bookingSchema, "rooms");