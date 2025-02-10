import axios from "axios";
import { Router } from "express";
import {
  createRegistro,
  deleteRegistro,
  getRegistroById,
  getRegistros,
  getRegistrosAtrasadosByMonth,
  getRegistrosByProfesorAndDay,
  getRegistrosByProfesorAndMonth,
  getRegistrosByProfesorAndWeek,
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
router.get("/registrosSemana", getRegistrosByProfesorAndWeek);
router.get("/registrosMensual", getRegistrosByProfesorAndMonth);
router.get("/registros-atrasos", getRegistrosAtrasadosByMonth);

router.post("/reconocer", async (req, res) => {
  try {
    console.log("Entró en el servidor");
    const { image } = req.body; // Imagen en Base64 desde React

    if (!image) {
      return res.status(400).json({ error: "No image received" });
    }

    console.log("Image received, sending to Flask...");

    try {
      const response = await axios.post("http://127.0.0.1:5000/recognize", {
        image,
      });
      console.log("Response from Flask:", response.data);
      return res.json(response.data);
    } catch (connectionError) {
      console.error("❌ Connection Error:", connectionError.message);
      return res.status(503).json({
        error:
          "No se pudo conectar con el servidor connect ECONNREFUSED 127.0.0.1:5000",
        details: connectionError.message,
      });
    }
  } catch (error) {
    console.error("❌ Error in Node.js:", error.message);
    return res.status(500).json({ error: "Error en el reconocimiento facial" });
  }
});

export default router;
