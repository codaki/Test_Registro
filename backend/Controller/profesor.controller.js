import { db } from "../db.js";

export const getProfesores = (req, res) => {
  db.query("SELECT * FROM profesor", (err, result) => {
    if (err) {
      console.error(
        "Error en la consulta a la base de datos, error numero:",
        err
      );
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    res.json(result.rows);
  });
};

export const getProfesorById = (req, res) => {
  const id = req.params.profesor_id;
  db.query(
    "SELECT * FROM profesor WHERE profesor_id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor no encontrado");
      }
      res.json(result.rows[0]);
    }
  );
};

export const createProfesor = (req, res) => {
  const { profesor_id, usuario_id, email } = req.body;
  db.query(
    "INSERT INTO profesor (profesor_id, email, usuario_id) VALUES ($1, $2, $3) RETURNING *",
    [profesor_id, email, usuario_id],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      res.status(201).json(result.rows[0]);
    }
  );
};

export const updateProfesor = (req, res) => {
  const profesor_id_find = req.params.profesor_id;
  const { profesor_id, usuario_id, email } = req.body;
  db.query(
    "UPDATE profesor SET profesor_id = $1, email = $2, usuario_id = $3 WHERE profesor_id = $4 RETURNING *",
    [profesor_id, email, usuario_id, profesor_id_find],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor no encontrado");
      }
      res.json(result.rows[0]);
    }
  );
};

export const deleteProfesor = (req, res) => {
  const profesor_id = req.params.profesor_id;
  db.query(
    "DELETE FROM profesor WHERE profesor_id = $1",
    [profesor_id],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rowCount === 0) {
        return res.status(404).send("Profesor no encontrado");
      }
      res.send("Profesor eliminado exitosamente");
    }
  );
};
