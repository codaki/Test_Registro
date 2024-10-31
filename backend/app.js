import cors from "cors";
import express from "express";
import profesorRoute from "./Routes/profesor.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", profesorRoute);
export default app;
