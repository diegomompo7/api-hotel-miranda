import { Document } from "mongoose"
import { Booking, IBooking, IBookingCreate } from "../model/BookingInterface"


export const getBookings = async() :Promise<IBooking[]> => {
    return await Booking.find().populate(["room"])
}
    
export const getBookingsId = async(id: string) :Promise<Document<IBooking> | null> => {
    return await Booking.findById(id).populate(["room"])
}

export const postBookings = async(bookingData: IBookingCreate): Promise<Document<IBooking>>  => {
    const booking = new Booking(bookingData)
    const document: Document<IBooking> = (await booking.save()) as any
    return document

}
export const patchBookings = async(id: string, bookingData: any): Promise<Document<IBooking> | null> => {
    return await Booking.findByIdAndUpdate(id, bookingData, { new: true, runValidators: true })
}

export const deleteBookings = async(id:string): Promise<Document<IBooking> | null>  => {
    return await Booking.findByIdAndDelete(id)
}