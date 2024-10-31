import { db } from "../db.js";

export const getHoras = (req, res) => {
  db.query("SELECT * FROM hora", (err, result) => {
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

export const getHoraById = (req, res) => {
  const id = req.params.hora_id;
  db.query("SELECT * FROM hora WHERE hora_id = $1", [id], (err, result) => {
    if (err) {
      console.error(
        "Error en la consulta a la base de datos, error numero:",
        err
      );
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    if (result.rows.length === 0) {
      return res.status(404).send("Hora no encontrada");
    }
    res.json(result.rows[0]);
  });
};

export const createHora = (req, res) => {
  const { hora_id, hora_registro, tiempo_gracia } = req.body;
  db.query(
    "INSERT INTO hora (hora_id, hora_registro, tiempo_gracia) VALUES ($1, $2, $3) RETURNING *",
    [hora_id, hora_registro, tiempo_gracia],
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

export const updateHora = (req, res) => {
  const hora_id_find = req.params.hora_id;
  const { hora_id, hora_registro, tiempo_gracia } = req.body;
  db.query(
    "UPDATE hora SET hora_id = $1, hora_registro = $2, tiempo_gracia = $3 WHERE hora_id = $4 RETURNING *",
    [hora_id, hora_registro, tiempo_gracia, hora_id_find],
    (err, result) => {
      if (err) {
        console.error(
          "Error en la consulta a la base de datos, error numero:",
          err
        );
        return res.status(500).send("Error en la consulta a la base de datos");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Hora no encontrada");
      }
      res.json(result.rows[0]);
    }
  );
};

export const deleteHora = (req, res) => {
  const id = req.params.hora_id;
  db.query("DELETE FROM hora WHERE hora_id = $1", [id], (err, result) => {
    if (err) {
      console.error(
        "Error en la consulta a la base de datos, error numero:",
        err
      );
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    if (result.rowCount === 0) {
      return res.status(404).send("Hora no encontrada");
    }
    res.send("Hora eliminada");
  });
};
