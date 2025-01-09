import { db } from "../db.js";

export const getHorarios = (req, res) => {
  db.query("SELECT * FROM horario", (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    res.json(result.rows);
  });
};

export const getHorarioById = (req, res) => {
  const id = req.params.horario_id;
  db.query(
    "SELECT * FROM horario WHERE horario_id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error en la consulta a la base de datos:", err);
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Horario no encontrado");
      }
      res.json(result.rows[0]);
    }
  );
};

export const createHorario = (req, res) => {
  const {
    profesor_id,
    asignatura,
    nrc,
    edificio,
    aula,
    hora_ingreso,
    hora_finalizacion,
    clase_lunes,
    clase_martes,
    clase_miercoles,
    clase_jueves,
    clase_viernes,
  } = req.body;
  db.query(
    "INSERT INTO horario (profesor_id, asignatura, nrc, edificio, aula, hora_ingreso, hora_finalizacion, clase_lunes, clase_martes, clase_miercoles, clase_jueves, clase_viernes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    [
      profesor_id,
      asignatura,
      nrc,
      edificio,
      aula,
      hora_ingreso,
      hora_finalizacion,
      clase_lunes,
      clase_martes,
      clase_miercoles,
      clase_jueves,
      clase_viernes,
    ],
    (err, result) => {
      if (err) {
        console.error("Error en la consulta a la base de datos:", err);
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      res.status(201).json(result.rows[0]);
    }
  );
};

export const updateHorario = (req, res) => {
  const horario_id_find = req.params.horario_id;
  const {
    profesor_id,
    asignatura,
    nrc,
    edificio,
    aula,
    hora_ingreso,
    hora_finalizacion,
    clase_lunes,
    clase_martes,
    clase_miercoles,
    clase_jueves,
    clase_viernes,
  } = req.body;
  db.query(
    "UPDATE horario SET profesor_id = $1, asignatura = $2, nrc = $3, edificio = $4, aula = $5, hora_ingreso = $6, hora_finalizacion = $7, clase_lunes = $8, clase_martes = $9, clase_miercoles = $10, clase_jueves = $11, clase_viernes = $12 WHERE horario_id = $13 RETURNING *",
    [
      profesor_id,
      asignatura,
      nrc,
      edificio,
      aula,
      hora_ingreso,
      hora_finalizacion,
      clase_lunes,
      clase_martes,
      clase_miercoles,
      clase_jueves,
      clase_viernes,
      horario_id_find,
    ],
    (err, result) => {
      if (err) {
        console.error("Error en la consulta a la base de datos:", err);
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Horario no encontrado");
      }
      res.json(result.rows[0]);
    }
  );
};

export const deleteHorario = (req, res) => {
  const id = req.params.horario_id;
  db.query("DELETE FROM horario WHERE horario_id = $1", [id], (err, result) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    if (result.rowCount === 0) {
      return res.status(404).send("Horario no encontrado");
    }
    res.send("Horario eliminado");
  });
};

export const cargar_horario = (req, res) => {
  const { docente_id, horario } = req.body;

  // Step 1: Get the profesor_id based on the docente_id
  db.query(
    "SELECT profesor_id FROM profesor WHERE docente_id = $1",
    [docente_id],
    (err, result) => {
      if (err) {
        console.error("Error en la consulta a la base de datos:", err);
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor no encontrado");
      }

      const profesor_id = result.rows[0].profesor_id;

      // Step 2: Upload the horario using the profesor_id
      const {
        asignatura,
        nrc,
        edificio,
        aula,
        hora_ingreso,
        hora_finalizacion,
        clase_lunes,
        clase_martes,
        clase_miercoles,
        clase_jueves,
        clase_viernes,
      } = horario;

      db.query(
        "INSERT INTO horario (profesor_id, asignatura, nrc, edificio, aula, hora_ingreso, hora_finalizacion, clase_lunes, clase_martes, clase_miercoles, clase_jueves, clase_viernes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12) RETURNING *",
        [
          profesor_id,
          asignatura,
          nrc,
          edificio,
          aula,
          hora_ingreso,
          hora_finalizacion,
          clase_lunes,
          clase_martes,
          clase_miercoles,
          clase_jueves,
          clase_viernes,
        ],
        (err, result) => {
          if (err) {
            console.error("Error en la consulta a la base de datos:", err);
            return res
              .status(500)
              .send("Error en la consulta a la base de datos");
          }
          res.status(201).json(result.rows[0]);
        }
      );
    }
  );
};
