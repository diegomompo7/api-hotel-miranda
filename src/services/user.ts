import { Document } from "mongoose";
import { IUser, IUserCreate, schema } from "../model/UserInterface";
import { sqlQuery } from "../databases/sql";

export const getUsers = async (): Promise<IUser[]> => {
  const users = await sqlQuery(`
    SELECT photo, fullName, id, email, startDate, descriptionJob, phone, status
    FROM users;`);

  return users.length !== 0 ? users : null;
};

export const getUsersId = async (
  id: string
): Promise<Document<IUser> | null> => {
  const user = await sqlQuery(
    `
    SELECT id, photo, fullName, password, email, phone, startDate, descriptionJob, status, job
    FROM users 
    WHERE id = ? `,
    [id]
  );

  return user.length !== 0 ? user : null;
};

export const postUser = async (
  userData: IUserCreate
): Promise<Document<Object>> => {
  try {
    const validateData = await schema.validateAsync(userData);

    return await sqlQuery(
      `
    INSERT INTO users (photo, fullName, job, email, phone, startDate, descriptionJob, status, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validateData.photo,
        validateData.fullName,
        validateData.job,
        validateData.email,
        validateData.phone,
        validateData.startDate,
        validateData.descriptionJob,
        validateData.status,
        validateData.password,
      ]
    );
  } catch (err: any) {
    return err
  }
};
export const patchUser = async (
  id: string,
  userData: any
): Promise<Document<Object>> => {
  try {
    const validateData = await schema.validateAsync(userData);
    const keys: string[] = Object.keys(validateData);
    const value: string[] = Object.values(validateData);

    const updateCol: string = keys
      .map((key: string) => `${key} = ?`)
      .join(", ");

    const updateUser = await sqlQuery(
      `
    UPDATE users
    SET ${updateCol}
    WHERE id=?
    `,
      [...value, id]
    );

    return updateUser.affectedRows !== 0 ? updateUser : undefined;
  } catch (err: any) {
    return err
  }
};

export const deleteUser = async (
  id: string
): Promise<Document<Object> | null> => {
  const deleteBooking = await sqlQuery(
    `
    DELETE FROM users
    WHERE id=?`,
    [id]
  );

  return deleteBooking.affectedRows !== 0 ? deleteBooking : null;
};
