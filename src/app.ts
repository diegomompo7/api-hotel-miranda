import { configureRoutes } from "./controllers";

const express = require('express')


// Configuración del server
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configureRoutes(app);