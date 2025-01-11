import { db } from "../db.js";

// Obtener todos los profesores
export const getProfesores = (req, res) => {
  const query = `
    SELECT 
      u.Nombre1, u.Nombre2, u.Apellido1, u.Apellido2, 
      u.Usuario_ID, p.Profesor_ID, p.Email, p.docente_id 
    FROM 
      Profesor p 
    JOIN 
      Usuario u 
    ON 
      p.Usuario_ID = u.Usuario_ID;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    res.json(result.rows);
  });
};

// Obtener un profesor por ID
export const getProfesorById = (req, res) => {
  const profesorId = parseInt(req.params.profesor_id, 10);
  const query = "SELECT * FROM Profesor WHERE Profesor_ID = $1";

  db.query(query, [profesorId], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    if (result.rows.length === 0) {
      return res.status(404).send("Profesor no encontrado");
    }
    res.json(result.rows[0]);
  });
};

// Crear un nuevo profesor
export const createProfesor = (req, res) => {
  const { usuario_id, email, docente_id } = req.body;
  const query = `
    INSERT INTO Profesor (Usuario_ID, Email, docente_id) 
    VALUES ($1, $2, $3) 
    RETURNING *;
  `;

  db.query(query, [usuario_id, email, docente_id], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    res.status(201).json(result.rows[0]);
  });
};

// Actualizar un profesor por ID
export const updateProfesor = (req, res) => {
  const profesorId = parseInt(req.params.profesor_id, 10);
  const { email, usuario_id, docente_id } = req.body;
  const query = `
    UPDATE Profesor 
    SET Email = $1, Usuario_ID = $2, docente_id = $3 
    WHERE Profesor_ID = $4 
    RETURNING *;
  `;

  db.query(query, [email, usuario_id, docente_id, profesorId], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    if (result.rows.length === 0) {
      return res.status(404).send("Profesor no encontrado");
    }
    res.json(result.rows[0]);
  });
};

// Eliminar un profesor por ID
export const deleteProfesor = (req, res) => {
  const profesorId = parseInt(req.params.profesor_id, 10);
  const query = "DELETE FROM Profesor WHERE Profesor_ID = $1";

  db.query(query, [profesorId], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    if (result.rowCount === 0) {
      return res.status(404).send("Profesor no encontrado");
    }
    res.send("Profesor eliminado exitosamente");
  });
};
