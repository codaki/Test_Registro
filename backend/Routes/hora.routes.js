import { Router } from "express";
import {
  createHora,
  deleteHora,
  getHoraById,
  getHoras,
  updateHora,
} from "../Controller/hora.controller.js";

const router = Router();

router.get("/horas", getHoras);
router.get("/hora/:hora_id", getHoraById);
router.post("/horas", createHora);
router.put("/horas/:hora_id", updateHora);
router.delete("/horas/:hora_id", deleteHora);

export default router;
