import { Router } from "express";
import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from "../Controller/usuario.controller.js";

const router = Router();

// Rutas para el CRUD de usuario
router.get('/usuarios', getUsuarios);             // Obtener todos los usuarios
router.get('/usuarios/:id', getUsuarioById);      // Obtener un usuario por ID
router.post('/usuarios', createUsuario);          // Crear un nuevo usuario
router.put('/usuarios/:id', updateUsuario);       // Actualizar un usuario por ID
router.delete('/usuarios/:id', deleteUsuario);    // Eliminar un usuario por ID

export default router;