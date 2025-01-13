import { Router } from "express";
import {
  createRegistro,
  deleteRegistro,
  getRegistroById,
  getRegistros,
  getRegistrosByProfesorAndDay,
  updateRegistro,
} from "../Controller/registro.controller.js";

const router = Router();

// Rutas para el CRUD de registro
router.get("/registros", getRegistros); // Obtener todos los registros
router.get("/registros/:id", getRegistroById); // Obtener un registro por ID
router.post("/registros", createRegistro); // Crear un nuevo registro
router.put("/registros/:id", updateRegistro); // Actualizar un registro por ID
router.delete("/registros/:id", deleteRegistro); // Eliminar un registro por ID
router.get("/registrosDia", getRegistrosByProfesorAndDay);

export default router;
