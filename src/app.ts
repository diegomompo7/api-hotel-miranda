import { configureRoutes } from "./controllers";
import express from 'express';

const port = 3000

// Configuración del server
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

configureRoutes(app);