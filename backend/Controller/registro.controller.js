import { db } from "../db.js";

// Obtener todos los registros
export const getRegistros = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM registro");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por ID
export const getRegistroById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT * FROM registro WHERE Registro_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Registro not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo registro
export const createRegistro = async (req, res) => {
  try {
    const { Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde } = req.body;
    const result = await db.query(
      "INSERT INTO Registro (Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro por ID
export const updateRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const { Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde } = req.body;
    const result = await db.query(
      "UPDATE Registro SET Profesor_ID = $1, Hora = $2, Dia = $3, Lugar = $4, Bool_Inicio = $5, Tarde = $6 WHERE Registro_id = $7 RETURNING *",
      [Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un registro por ID
export const deleteRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM registro WHERE Registro_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Registro not found" });
    }
    res.status(200).json({ message: "Registro deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRegistrosByProfesorAndDay = async (req, res) => {
  try {
    const { Profesor_ID, Dia } = req.query;
    const result = await db.query(
      "SELECT * FROM registro WHERE Profesor_ID = $1 AND dia = $2",
      [Profesor_ID, Dia]
    );
    res.status(200).json(result.rows);
    console.log("Registros:", result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
