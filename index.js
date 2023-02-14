const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require("cors");
require("dotenv").config();

//Crear servidor
const app = express();

//Cors
app.use(cors());

//Base de datos
dbConnection();

//Lectura y parseo del body
app.use(express.json());

//Directorio público
app.use(express.static("public"));

//Rutas
app.use("/api/auth", require("./routes/auth"));

app.use("/api/games", require("./routes/games"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
