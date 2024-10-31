import { db } from "../db.js"

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM usuario');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener un usuario por ID
  export const getUsuarioById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('SELECT * FROM usuario WHERE Usuario_ID = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Crear un nuevo usuario
  export const createUsuario = async (req, res) => {
    try {
      const { Username, Password, Nombre1, Nombre2, Apellido1, Apellido2, Rol_ID } = req.body;
      const result = await db.query(
        'INSERT INTO usuario (Username, Password, Nombre1, Nombre2, Apellido1, Apellido2, Rol_ID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [Username, Password, Nombre1, Nombre2, Apellido1, Apellido2, Rol_ID]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar un usuario por ID
  export const updateUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { Username, Password, Nombre1, Nombre2, Apellido1, Apellido2, Rol_ID } = req.body;
      const result = await db.query(
        'UPDATE usuario SET Username = $1, Password = $2, Nombre1 = $3, Nombre2 = $4, Apellido1 = $5, Apellido2 = $6, Rol_ID = $7 WHERE Usuario_ID = $8 RETURNING *',
        [Username, Password, Nombre1, Nombre2, Apellido1, Apellido2, Rol_ID, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar un usuario por ID
  export const deleteUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('DELETE FROM usuario WHERE Usuario_ID = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario not found' });
      }
      res.status(200).json({ message: 'Usuario deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };