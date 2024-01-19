import { Document } from "mongoose";
import { IBooking, IBookingCreate, schema } from "../model/BookingInterface";
import { sqlQuery } from "../databases/sql";

export const getBookings = async (): Promise<IBooking[]> => {
  const bookings = await sqlQuery(`
    SELECT bookings.id, name, orderDate, check_in, hour_in, check_out, hour_out, roomNumber, bookings.status 
    FROM bookings 
    INNER JOIN rooms ON bookings.room_id = rooms.id;`);

  return bookings.length !== 0 ? bookings : null;
};

export const getBookingsId = async (
  id: string
): Promise<Document<IBooking> | null> => {
  const booking = await sqlQuery(
    `
    SELECT bookings.id, name, orderDate, check_in, hour_in, check_out, hour_out, roomNumber, priceNight, specialRequest, amenities, bookings.status, roomType, description
    FROM bookings 
    INNER JOIN rooms ON bookings.room_id = rooms.id
    WHERE bookings.id = ?`,
    [id]
  );

  return booking.length !== 0 ? booking : null;
};

export const postBooking = async (
  bookingData: IBookingCreate
): Promise<Document<Object>> => {
  try {
    const validateData = await schema.validateAsync(bookingData);

    return await sqlQuery(
      `
    INSERT INTO bookings (name,orderDate, check_in, hour_in, check_out, hour_out, room_id, specialRequest, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validateData.name,
        validateData.orderDate,
        validateData.check_in,
        validateData.hour_in,
        validateData.check_out,
        validateData.hour_out,
        validateData.room_id,
        validateData.specialRequest,
        validateData.status,
      ]
    );
  } catch (err: any) {
    return err
  }
};

export const patchBooking = async (
  id: string,
  bookingData: any
): Promise<Document<Object>> => {
  try {
    const validateData = await schema.validateAsync(bookingData);

    const keys: string[] = Object.keys(validateData);
    const value: string[] = Object.values(validateData);

    const updateCol: string = keys
      .map((key: string) => `${key} = ?`)
      .join(", ");

    const updateBooking = await sqlQuery(
      `
    UPDATE bookings
    SET ${updateCol}
    WHERE id=?
    `,
      [...value, id]
    );

    return updateBooking.affectedRows !== 0 ? updateBooking : undefined;
  } catch (err: any) {
    return err
  }
};
export const deleteBooking = async (
  id: string
): Promise<Document<Object> | null> => {
  const deleteBooking = await sqlQuery(
    `
    DELETE FROM bookings 
    WHERE id=?`,
    [id]
  );

  return deleteBooking.affectedRows !== 0 ? deleteBooking : null;
};
