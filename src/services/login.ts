import { sqlQuery } from "../databases/sql";
import { IUser } from "../model/UserInterface";

export const postLogin = async (userLogin: any): Promise<IUser | null> => {
  const [user] = await sqlQuery(
    `
        SELECT id, photo, fullName, email
        FROM users 
        WHERE email = ? AND password = ?`,
    [userLogin.email, userLogin.password]
  );

  return user.length !== 0 ? user : null;
};
