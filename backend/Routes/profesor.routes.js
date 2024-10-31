import { Router } from "express";
import {
  createProfesor,
  deleteProfesor,
  getProfesorById,
  getProfesores,
  updateProfesor,
} from "../Controller/profesor.controller.js";

const router = Router();

router.get("/profesores", getProfesores);
router.get("/profesror/:id", getProfesorById);
router.post("/profesores", createProfesor);
router.put("/profesores/:profesor_id", updateProfesor);
router.delete("/profesores/:profesor_id", deleteProfesor);

export default router;
