import mysql, { type Connection, type ConnectionOptions } from "mysql2/promise";
require("dotenv").config();

const SQL_USER: string = process.env.SQL_USER as string;
const SQL_PASSWORD: string = process.env.SQL_PASSWORD as string;
const SQL_DATABASE: string = process.env.SQL_DATABASE as string;

const config: ConnectionOptions = {
  host: "localhost",
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
};

export const sqlConnect = async (): Promise<Connection> => {
  const connection: Connection = await mysql.createConnection(config);
  return connection;
};

export const sqlQuery = async (
  sqlQuery: string,
  params?: any[]
): Promise<any> => {
  const connection = await sqlConnect();
  const [results] = await connection.execute(sqlQuery, params);
  connection.end();
  return results;
};
