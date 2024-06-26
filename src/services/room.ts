import { Document } from "mongoose";
import { IRoom, IRoomCreate, schema } from "../model/RoomInterface";
import { sqlQuery } from "../databases/sql";

export const getRooms = async (): Promise<IRoom[]> => {
  const rooms = await sqlQuery(`
    SELECT photos, rooms.id, roomNumber, roomType, GROUP_CONCAT(amenity) as amenities, priceNight, status 
    FROM rooms LEFT JOIN amenities ON rooms.id = amenities.room_id GROUP BY rooms.id;`);

  return rooms.length !== 0 ? rooms : null;
};

export const getRoomsId = async (
  id: string
): Promise<Document<IRoom> | null> => {
  const room = await sqlQuery(
    `
    SELECT roomType, offer, photos, roomNumber, description, priceNight, discount, cancellation, GROUP_CONCAT(amenity) as amenities
    FROM rooms LEFT JOIN amenities ON rooms.id = amenities.room_id
    WHERE rooms.id = 5 GROUP BY rooms.id;`,
    [id]
  );

  return room.length !== 0 ? room : null;
};

export const postRoom = async (
  roomData: IRoomCreate
): Promise<Document<Object>> => {
  try {
    const validateData = await schema.validateAsync(roomData);

    const newRoom = await sqlQuery(
      `
    INSERT INTO rooms (photos, roomType, roomNumber, description, offer, priceNight, discount , cancellation, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validateData.photos,
        validateData.roomType,
        validateData.roomNumber,
        validateData.description,
        validateData.offer,
        validateData.priceNight,
        validateData.discount,
        validateData.cancellation,
        validateData.status,
      ]
    );

    return newRoom


  } catch (err: any) {
    return err
  }
};
export const patchRoom = async (
  id: string,
  roomData: any
): Promise<Document<Object>> => {
  try {
    const validateData = await schema.validateAsync(roomData);

    const keys: string[] = Object.keys(validateData);
    const value: string[] = Object.values(validateData);

    const updateCol: string = keys
      .map((key: string) => `${key} = ?`)
      .join(", ");

    const updateRoom = await sqlQuery(
      `
    UPDATE rooms
    SET ${updateCol}
    WHERE id=?
    `,
      [...value, id]
    );

    return updateRoom.affectedRows !== 0 ? updateRoom : null;
  } catch (err: any) {
    return err
  }
};

export const deleteRoom = async (
  id: string
): Promise<Document<Object> | null> => {
  const deleteBooking = await sqlQuery(
    `
    DELETE FROM rooms
    WHERE id=?`,
    [id]
  );

  return deleteBooking.affectedRows !== 0 ? deleteBooking : null;
};
