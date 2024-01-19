import { Document } from "mongoose";
import { IContact, IContactCreate } from "../model/ContactInterface";
import { sqlQuery } from "../databases/sql";

export const getContacts = async (): Promise<IContact[]> => {
  const contacts = await sqlQuery(`
    SELECT userImg, date, id, name, surname, email, phone, subject, message, is_archived 
    FROM contacts;`);

  return contacts.length !== 0 ? contacts : null;
};

export const getContactsId = async (
  id: string
): Promise<Document<IContact> | null> => {
  const contact = await sqlQuery(
    `
    SELECT *
    FROM contacts 
    WHERE id = ? `,
    [id]
  );

  return contact.length !== 0 ? contact : null;
};

export const postContact = async (
  contactData: IContactCreate
): Promise<Document<IContact>> => {
  return await sqlQuery(
    `
    INSERT INTO contacts (userImg, name, surname, email, phone, date, subject, message, starts, is_archived)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      contactData.userImg,
      contactData.name,
      contactData.surname,
      contactData.email,
      contactData.phone,
      contactData.date,
      contactData.subject,
      contactData.message,
      contactData.stars,
      contactData.is_archived,
    ]
  );
};
export const patchContact = async (
  id: string,
  contactData: any
): Promise<Document<Object> | null> => {
  const keys: string[] = Object.keys(contactData);
  const value: string[] = Object.values(contactData);

  const updateCol: string = keys.map((key: string) => `${key} = ?`).join(", ");

  const updateContact = await sqlQuery(
    `
    UPDATE contacts
    SET ${updateCol}
    WHERE id=?
    `,
    [...value, id]
  );

  return updateContact.affectedRows !== 0 ? updateContact : null;
};

export const deleteContact = async (
  id: string
): Promise<Document<Object> | null> => {
  const deleteBooking = await sqlQuery(
    `
    DELETE FROM contacts
    WHERE id=?`,
    [id]
  );

  return deleteBooking.affectedRows !== 0 ? deleteBooking : null;
};
