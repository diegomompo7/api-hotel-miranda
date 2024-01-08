import { configureRoutes } from "./controllers";
import express from 'express';
const cors = require('cors');

const port = 3001

const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen (puedes ajustar esto según tus necesidades)
  methods: 'GET,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type,Authorization', // Agrega los encabezados necesarios para las solicitudes POST
};


// Configuración del server
export const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('', function (_req, res, _next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

configureRoutes(app);