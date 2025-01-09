import { Router } from "express";
import {
  createHorario,
  deleteHorario,
  getHorarioById,
  getHorarios,
  updateHorario,
} from "../Controller/horario.controller.js";

const router = Router();

router.get("/horarios", getHorarios);
router.get("/horario/:horario_id", getHorarioById);
router.post("/horarios", createHorario);
router.put("/horarios/:horario_id", updateHorario);
router.delete("/horarios/:horario_id", deleteHorario);

export default router;
