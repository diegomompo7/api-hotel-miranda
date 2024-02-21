import { configureRoutes } from "./controllers";
import express from 'express';
import { mongoConnect } from "./mongo-repository";
import cors from "cors";

const port = 3001

// Configuración del server
export const app = express();
app.use(cors());
mongoConnect()
app.use(express.json());
configureRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

