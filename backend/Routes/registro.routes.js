import { Router } from "express";
import {
    getRegistros,
    getRegistroById,
    createRegistro,
    updateRegistro,
    deleteRegistro,
} from "../Controller/registro.controller.js";

const router = Router();

// Rutas para el CRUD de registro
router.get('/registros', getRegistros);             // Obtener todos los registros
router.get('/registros/:id', getRegistroById);      // Obtener un registro por ID
router.post('/registros', createRegistro);          // Crear un nuevo registro
router.put('/registros/:id', updateRegistro);       // Actualizar un registro por ID
router.delete('/registros/:id', deleteRegistro);    // Eliminar un registro por ID

export default router;