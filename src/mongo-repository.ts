const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

async function mongoConnect() {
  try {
      // Conectarse a la base de datos de Django
      await mongoose.connect('mongodb://15.188.49.158/admin', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('Conexión exitosa a la base de datos de Django');
  } catch (error) {
      console.error(error);
      console.log("Error en la conexión, intentando conectar en 5s...");
      setTimeout(mongoConnect, 5000);
  }
}