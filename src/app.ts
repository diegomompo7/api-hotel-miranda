import { configureRoutes } from "./controllers";
import express from "express";
import { mongoConnect } from "./databases/mongo-repository";
import { sqlConnect } from "./databases/sql";

const init = async () => {
  const sqlDatabase = await sqlConnect();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(port, () => {
    console.log(
      `We are using the Mongo database and listening on port ${port}`
    );
    console.log(
      `We are using the mySQL database ${
        sqlDatabase?.config?.database as string
      }`
    );
  });

  configureRoutes(app);
};

const cors = require("cors");

const port = 3001;
mongoConnect();
init();

// Configuración del server
export const app = express();
app.use(cors());
app.use(express.json());
