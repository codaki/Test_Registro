import { Router } from "express";
import {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
} from "../Controller/rol.controller.js";

const router = Router();

// Rutas para el CRUD de rol
router.get('/roles', getRoles);           // Obtener todos los roles
router.get('/roles/:id', getRolById);     // Obtener un rol por ID
router.post('/roles', createRol);         // Crear un nuevo rol
router.put('/roles/:id', updateRol);      // Actualizar un rol por ID
router.delete('/roles/:id', deleteRol);   // Eliminar un rol por ID

export default router;