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

export const createRegistro = async (req, res) => {
  try {
    let { Profesor_ID, Hora, Dia, Lugar } = req.body;
    let Tarde = false;
    let Bool_Inicio = true;

    // Convertir la hora de registro a formato numérico HHMM (sin ":")
    const horaRegistro = parseInt(Hora.replace(":", ""), 10);
    console.log("Hora de Registro:", horaRegistro);

    // Verificar si el último registro fue de entrada o salida
    const lastRegistroResult = await db.query(
      "SELECT Bool_Inicio FROM registro WHERE Profesor_ID = $1 ORDER BY registro_id DESC LIMIT 1",
      [Profesor_ID]
    );

    if (lastRegistroResult.rows.length > 0) {
      Bool_Inicio = !lastRegistroResult.rows[0].bool_inicio; // Invertir el estado
    }

    console.log("Es un registro de:", Bool_Inicio ? "ENTRADA" : "SALIDA");

    // Obtener el horario del profesor para el día dado
    const diaSemana = new Date(Dia).getDay(); // 0 = Domingo, 1 = Lunes, ...
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];
    const diaColumna = `clase_${diasSemana[diaSemana]}`;

    // Obtener horarios de entrada y salida
    const horarioEntradaResult = await db.query(
      `SELECT hora_ingreso FROM horario WHERE profesor_id = $1 AND ${diaColumna} = true`,
      [Profesor_ID]
    );

    const horarioSalidaResult = await db.query(
      `SELECT hora_finalizacion FROM horario WHERE profesor_id = $1 AND ${diaColumna} = true`,
      [Profesor_ID]
    );

    if (
      horarioEntradaResult.rows.length === 0 ||
      horarioSalidaResult.rows.length === 0
    ) {
      return res.status(400).json({
        message: "No hay horario registrado para este profesor en este día.",
      });
    }

    // Convertir horarios a números enteros para comparación
    const horariosIngresos = horarioEntradaResult.rows.map((h) =>
      parseInt(h.hora_ingreso, 10)
    );
    const horariosFinalizaciones = horarioSalidaResult.rows.map((h) =>
      parseInt(h.hora_finalizacion, 10)
    );

    console.log("Horarios de ingreso:", horariosIngresos);
    console.log("Horarios de salida:", horariosFinalizaciones);

    let horarioEntrada = null;
    let horarioSalida = null;

    // Buscar el horario de ingreso y salida correspondiente
    for (let i = 0; i < horariosIngresos.length; i++) {
      if (
        horaRegistro >= horariosIngresos[i] - 10 && // Permitir 10 minutos antes del ingreso
        horaRegistro <= horariosFinalizaciones[i] // Debe estar dentro del horario de clase
      ) {
        horarioEntrada = horariosIngresos[i];
        horarioSalida = horariosFinalizaciones[i];
        break;
      }
    }

    if (!horarioEntrada || !horarioSalida) {
      return res
        .status(400)
        .json({ message: "El profesor no tiene clases en este momento." });
    }

    if (Bool_Inicio) {
      // REGISTRO DE ENTRADA
      const margenTolerancia = 5;
      if (horaRegistro > horarioEntrada + margenTolerancia) {
        Tarde = true; // Si es más de 5 minutos después de la hora de ingreso, es tarde
      }
      console.log(
        "Registro de entrada válido en horario:",
        horarioEntrada,
        "| Tarde:",
        Tarde
      );
    } else {
      // REGISTRO DE SALIDA (Se permite en cualquier momento antes de la finalización)
      console.log("Registro de salida válido en horario:", horarioSalida);
    }

    // Insertar el registro en la base de datos
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
    console.log("Profesor_ID:", Profesor_ID);
    console.log("Dia:", Dia);
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

export const getRegistrosByProfesorAndWeek = async (req, res) => {
  try {
    const { Profesor_ID, Dia } = req.query;

    // Convertir Dia en objeto Date
    const date = new Date(Dia);
    const dayOfWeek = date.getDay();

    // Ajustar al domingo de la semana actual
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek - 1); // Restar el número de días para llegar al domingo

    // Ajustar al sábado (seis días después del domingo)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Formatear fechas para la consulta (YYYY-MM-DD)
    const startDate = startOfWeek.toISOString().split("T")[0];
    const endDate = endOfWeek.toISOString().split("T")[0];

    console.log("Rango de la semana:", startDate, "a", endDate);
    const result = await db.query(
      `SELECT * FROM registro 
         WHERE Profesor_ID = $1 
         AND dia >= $2 
         AND dia <= $3 
         ORDER BY dia, hora`,
      [Profesor_ID, startDate, endDate]
    );
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
