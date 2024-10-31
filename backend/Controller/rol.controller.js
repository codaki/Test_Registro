import { db } from "../db.js"

// Obtener todos los roles
export const getRoles = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM rol');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener un rol por ID
export const getRolById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('SELECT * FROM rol WHERE Rol_Id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Rol not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Crear un nuevo rol
export const createRol = async (req, res) => {
    try {
      const { Rol_Nombre, Rol_Permiso } = req.body;
      const result = await db.query(
        'INSERT INTO rol (Rol_Nombre, Rol_Permiso) VALUES ($1, $2) RETURNING *',
        [Rol_Nombre, Rol_Permiso]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar un rol por ID
export const updateRol = async (req, res) => {
    try {
      const { id } = req.params;
      const { Rol_Nombre, Rol_Permiso } = req.body;
      const result = await db.query(
        'UPDATE rol SET Rol_Nombre = $1, Rol_Permiso = $2 WHERE Rol_Id = $3 RETURNING *',
        [Rol_Nombre, Rol_Permiso, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Rol not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar un rol por ID
export const deleteRol = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('DELETE FROM rol WHERE Rol_Id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Rol not found' });
      }
      res.status(200).json({ message: 'Rol deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };