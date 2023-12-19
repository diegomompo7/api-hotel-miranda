import { UserInterface } from "../model/UserInterface";
import users from "../data/users.json";

const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

export const generateToken = (email: any): string => {
  if (!email) {
    throw new Error("Email missing");
  }

  const idUser: UserInterface = users.find((user: UserInterface) => user.email === email.email)!;
  console.log(idUser);

  const payload = {
    userId: idUser.id,
    userEmail: email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '24h'} );
  return token;
  
};

export const verifyToken = (token: string): any => {
  if (!token) {
    throw new Error("Token is missing");
  }

    const result = jwt.verify(token, process.env.JWT_SECRET);

    return result;
};  