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

  if (isNaN(profesorId)) {
    return res.status(400).json({ error: "ID de profesor inválido" });
  }

  const query = `
    SELECT
      p.Profesor_ID,
      u.Cedula, 
      u.Username, 
      u.UserPassword, 
      u.Nombre1, 
      u.Nombre2, 
      u.Apellido1, 
      u.Apellido2, 
      p.Email, 
      p.docente_id
    FROM Profesor p
    JOIN Usuario u ON p.Usuario_ID = u.Usuario_ID
    WHERE p.Profesor_ID = $1;
  `;

  db.query(query, [profesorId], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ error: "Error en la consulta a la base de datos" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
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
  const {
    Cedula,
    Username,
    UserPassword,
    Nombre1,
    Nombre2,
    Apellido1,
    Apellido2,
    Email,
    docente_id
  } = req.body;

  if (isNaN(profesorId)) {
    return res.status(400).json({ error: "ID de profesor inválido" });
  }

  // 🔹 Obtiene el `Usuario_ID` asociado al `Profesor_ID`
  const getUserQuery = "SELECT Usuario_ID FROM Profesor WHERE Profesor_ID = $1";

  db.query(getUserQuery, [profesorId], (err, result) => {
    if (err) {
      console.error("Error obteniendo Usuario_ID:", err);
      return res.status(500).json({ error: "Error en la consulta a la base de datos" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const usuarioId = result.rows[0].usuario_id;

    // 🔹 Construcción dinámica de la consulta para manejar la contraseña opcionalmente
    const updateQuery = `
      WITH updated_user AS (
        UPDATE Usuario 
        SET 
          Cedula = $1,
          Username = $2,
          ${UserPassword ? "UserPassword = $3," : ""} 
          Nombre1 = $4, 
          Nombre2 = $5, 
          Apellido1 = $6, 
          Apellido2 = $7
        WHERE Usuario_ID = $8
        RETURNING Usuario_ID
      )
      UPDATE Profesor 
      SET 
        Email = $9,
        docente_id = $10
      WHERE Profesor_ID = $11
      RETURNING *;
    `;

    const values = [
      Cedula,
      Username,
      ...(UserPassword ? [UserPassword] : []), // Agrega contraseña solo si se envió
      Nombre1,
      Nombre2,
      Apellido1,
      Apellido2,
      usuarioId, // 🔹 Se usa `usuarioId` obtenido antes
      Email,
      docente_id,
      profesorId
    ];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error en la actualización:", err);
        return res.status(500).json({ error: "Error en la actualización de datos" });
      }

      res.json({ message: "Profesor actualizado correctamente", profesor: result.rows[0] });
    });
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

export const getProfesorHorario = (req, res) => {
  console.log("getProfesorHorario");
  const profesorId = req.params.profesor_id;
  const currentTime = new Date()
    .toLocaleTimeString("en-US", { hour12: false })
    .replace(/:/g, "")
    .slice(0, 4);
  const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  console.log(currentTime, currentDay);
  // Map day number to column name
  const dayColumns = {
    1: "clase_lunes",
    2: "clase_martes",
    3: "clase_miercoles",
    4: "clase_jueves",
    5: "clase_viernes",
  };

  const IdProfesores = {
    1: 6,
    2: 7,
    3: 8,
    4: 11,
    5: 12,
    6: 13,
    7: 17,
    8: 999,
    9: 19,
    10: 20,
    11: 21,
    12: 22,
    13: 27,
    14: 888,
    15: 29,
    16: 32,
    17: 33,
    18: 777,
    19: 35,
    20: 38,
    21: 40,
    22: 42,
    23: 44,
    24: 47,
    25: 48,
    26: 49,
    27: 56,
    28: 666,
    29: 58,
    30: 59,
    31: 61,
    32: 555,
    33: 62,
    34: 63,
    35: 64,
  };
  const mappedProfesorId = IdProfesores[profesorId];
  const dayColumn = dayColumns[currentDay];

  // Only proceed if it's a weekday
  if (!dayColumn) {
    return res
      .status(400)
      .json({ message: "No hay clases los fines de semana" });
  }

  const query = `
    SELECT u.Nombre1, u.Apellido1,p.profesor_id, p.docente_id, h.asignatura, h.hora_ingreso, h.hora_finalizacion,
    h.aula,h.edificio,h.nrc
    FROM Profesor p
    INNER JOIN Usuario u ON p.Usuario_ID = u.Usuario_ID 
    INNER JOIN Horario h ON p.Profesor_ID = h.Profesor_ID
    WHERE p.Profesor_ID = $1 
    --AND h.${dayColumn} = true
    AND h.clase_miercoles = true
    AND $2::time BETWEEN 
   (CAST(h.hora_ingreso AS TIME) - INTERVAL '10 minutes') 
    AND 
    (CAST(h.hora_finalizacion AS TIME) + INTERVAL '10 minutes');
  `;

  db.query(query, [mappedProfesorId, "0700"], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        message:
          "No se encontró clase actual para este profesor en este horario",
      });
    }

    res.json(result.rows[0]);
  });
};
