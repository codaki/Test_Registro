import express from "express";
import { db } from "./db.js";
const app = express();

db.connect((err) => {
  if (err) {
    console.error(
      "Error en la conexión a la base de datos, error numero:",
      err
    );
    return;
  }
  console.log("Conexión exitosa a la base de datos!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
