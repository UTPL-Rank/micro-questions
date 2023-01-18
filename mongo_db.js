const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MONGO_DB_URI;

// comment for validate .env
if (!connectionString) {
  console.error("Se requiere variables de entorno: MONGO_DB_URI");
}

// conexión a mongodb
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
