import { db } from "../db.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM usuario");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT * FROM usuario WHERE Usuario_ID = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const {
      Cedula,
      Username,
      UserPassword,
      Nombre1,
      Nombre2,
      Apellido1,
      Apellido2,
      RoL_ID,
      Email,
      docente_id,
    } = req.body;

    const result = await db.query(
      "INSERT INTO Usuario (Cedula, Username, UserPassword, Nombre1, Nombre2, Apellido1, Apellido2, RoL_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        Cedula,
        Username,
        UserPassword,
        Nombre1,
        Nombre2,
        Apellido1,
        Apellido2,
        RoL_ID,
      ]
    );

    const newUser = result.rows[0];

    if (RoL_ID === 2) { // Si el rol es de profesor
      await db.query(
        "INSERT INTO Profesor (Usuario_ID, Email, docente_id) VALUES ($1, $2, $3)",
        [newUser.Usuario_ID, Email, docente_id]
      );
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Cedula,
      Username,
      Password,
      Nombre1,
      Nombre2,
      Apellido1,
      Apellido2,
      RoL_ID,
    } = req.body;
    const result = await db.query(
      "UPDATE usuario SET Username = $1, UserPassword = $2, Nombre1 = $3, Nombre2 = $4, Apellido1 = $5, Apellido2 = $6, RoL_ID = $7, Cedula =$8 WHERE Usuario_ID = $9 RETURNING *",
      [
        Username,
        Password,
        Nombre1,
        Nombre2,
        Apellido1,
        Apellido2,
        RoL_ID,
        Cedula,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario not found" });
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
    const result = await db.query(
      "DELETE FROM usuario WHERE Usuario_ID = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario not found" });
    }
    res.status(200).json({ message: "Usuario deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};