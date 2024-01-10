import { configureRoutes } from "./controllers";
import express from 'express';
const cors = require('cors');

const port = 3001

// Configuración del server
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

configureRoutes(app);