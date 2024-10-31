import { db } from "../db.js";

export const getProfesorHoras = (req, res) => {
  db.query("SELECT * FROM profesor_hora", (err, result) => {
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

export const getProfesorHoraByProfessorId = (req, res) => {
  const id = req.params.profesor_id;
  db.query(
    "SELECT * FROM profesor_hora WHERE profesor_id = $1",
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
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const getProfesorHoraByHoraId = (req, res) => {
  const id = req.params.hora_id;
  db.query(
    "SELECT * FROM profesor_hora WHERE hora_id = $1",
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
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const getProfesorHoraByDia = (req, res) => {
  const dia = req.params.dia;
  db.query(
    "SELECT * FROM profesor_hora WHERE dia = $1",
    [dia],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const getProfesorHoraByAula = (req, res) => {
  const aula = req.params.aula;
  db.query(
    "SELECT * FROM profesor_hora WHERE aula = $1",
    [aula],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const getProfesorHoraByProfessorIdAndHoraId = (req, res) => {
  const profesor_id = req.params.profesor_id;
  const hora_id = req.params.hora_id;
  db.query(
    "SELECT * FROM profesor_hora WHERE profesor_id = $1 AND hora_id = $2",
    [profesor_id, hora_id],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const getProfesorHoraByDiaAndAula = (req, res) => {
  const dia = req.params.dia;
  const aula = req.params.aula;
  db.query(
    "SELECT * FROM profesor_hora WHERE dia = $1 AND aula = $2",
    [dia, aula],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const createProfesorHora = (req, res) => {
  const { profesor_id, hora_id, dia, aula } = req.body;
  db.query(
    "INSERT INTO profesor_hora (profesor_id, hora_id, dia, aula) VALUES ($1, $2, $3, $4) RETURNING *",
    [profesor_id, hora_id, dia, aula],
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

export const updateProfesorHora = (req, res) => {
  const profesor_id_find = req.params.profesor_id;
  const { profesor_id, hora_id, dia, aula } = req.body;
  db.query(
    "UPDATE profesor_hora SET profesor_id = $1, hora_id = $2, dia = $3, aula = $4 WHERE profesor_id = $5 RETURNING *",
    [profesor_id, hora_id, dia, aula, profesor_id_find],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const deleteProfesorHora = (req, res) => {
  const id = req.params.profesor_id;
  db.query(
    "DELETE FROM profesor_hora WHERE profesor_id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rowCount === 0) {
        return res.status(404).send("Profesor_hora no encontrada");
      }
      res.send("Profesor_hora eliminada");
    }
  );
};
