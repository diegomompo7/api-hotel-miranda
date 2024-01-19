import { sqlQuery } from "../databases/sql";
import { User } from "../model/UserInterface";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

export const generateToken = async (emailUser: any): Promise<string> => {
  if (!emailUser) {
    throw new Error("Email missing");
  }

  const idUser = await sqlQuery(
    `
        SELECT id, photo, full_name, email
        FROM users 
        WHERE email = ?`,
    [emailUser.email]
  );

  const payload = {
    userId: idUser!.id,
    userEmail: emailUser,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = async (token: string): Promise<any> => {
  if (!token) {
    throw new Error("Token is missing");
  } else {
    const result = jwt.verify(token, process.env.JWT_SECRET);

    const userLogged = await User.findById(result.userId);

    return userLogged;
  }
};
