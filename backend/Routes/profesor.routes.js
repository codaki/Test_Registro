import { Router } from "express";
import {
  createProfesor,
  deleteProfesor,
  getProfesorById,
  getProfesores,
  getProfesorHorario,
  updateProfesor,
} from "../Controller/profesor.controller.js";

const router = Router();

router.get("/profesores", getProfesores);
router.get("/profesores/:profesor_id", getProfesorById);
router.post("/profesores", createProfesor);
router.put("/profesores/:profesor_id", updateProfesor);
router.delete("/profesores/:profesor_id", deleteProfesor);
router.get("/profesores/:profesor_id/horario-actual", getProfesorHorario);
export default router;
