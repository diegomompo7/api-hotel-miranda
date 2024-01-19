const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export async function mongoConnect() {
  try {
    return await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.error(error);
    console.log("Error en la conexión, intentando conectar en 5s...");
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(mongoConnect, 5000);

    return null;
  }
}
