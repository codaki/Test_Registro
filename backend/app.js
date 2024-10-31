import cors from "cors";
import express from "express";
import horaRoutes from "./Routes/hora.routes.js";
import profesorRoute from "./Routes/profesor.routes.js";
import registroRoute from "./Routes/registro.routes.js";
import rolRoute from "./Routes/rol.routes.js";
import usuariosRoute from "./Routes/usuario.routes.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", profesorRoute);

app.use("/api", horaRoutes);
app.use("/api", rolRoute);
app.use("/api", usuariosRoute);
app.use("/api", registroRoute);
export default app;
