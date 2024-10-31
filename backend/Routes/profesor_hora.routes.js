import { Router } from "express";
import {
  createProfesorHora,
  deleteProfesorHora,
  getProfesorHoraByAula,
  getProfesorHoraByDia,
  getProfesorHoraByDiaAndAula,
  getProfesorHoraByHoraId,
  getProfesorHoraByProfessorId,
  getProfesorHoras,
  updateProfesorHora,
} from "../Controller/profesor_hora.controller.js";

const router = new Router();

router.get("/profesor_horas", getProfesorHoras);
router.get("/profesor_horas/:profesor_id", getProfesorHoraByProfessorId);
router.get("/profesor_horas/:hora_id", getProfesorHoraByHoraId);
router.get("/profesor_horas/:dia", getProfesorHoraByDia);
router.get("/profesor_horas/:aula", getProfesorHoraByAula);
router.get("/profesor_horas/:hora_id/:profesor_id", getProfesorHoraByHoraId);
router.get("/profesor_horas/:dia/:aula", getProfesorHoraByDiaAndAula);
router.post("/profesor_horas", createProfesorHora);
router.put("/profesor_horas/:profesor_id", updateProfesorHora);
router.delete("/profesor_horas/:profesor_id", deleteProfesorHora);

export default router;
