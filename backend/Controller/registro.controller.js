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
// export const createRegistro = async (req, res) => {
//   try {
//     const { Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde } = req.body;
//     const result = await db.query(
//       "INSERT INTO Registro (Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [Profesor_ID, Hora, Dia, Lugar, Bool_Inicio, Tarde]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
export const createRegistro = async (req, res) => {
  try {
    let { Profesor_ID, Hora, Dia, Lugar } = req.body;
    let Tarde = false;
    let Bool_Inicio = true;
    // Invertir Bool_Inicio
    Bool_Inicio = !Bool_Inicio;

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

    const horarioResult = await db.query(
      `SELECT hora_ingreso 
       FROM horario 
       WHERE profesor_id = $1 
       AND ${diaColumna} = true`,
      [Profesor_ID]
    );

    if (horarioResult.rows.length > 0) {
      const horaHorario = new Date(
        `1970-01-01T${horarioResult.rows[0].hora_ingreso}`
      );
      const horaRegistro = new Date(`1970-01-01T${Hora}`);

      // Calcular diferencia en minutos
      const diferenciaMinutos = (horaRegistro - horaHorario) / (1000 * 60);

      // Si la diferencia es mayor a 10 minutos, marcar como tarde
      if (diferenciaMinutos > 10) {
        Tarde = true;
      }
    }

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
    console.log(Dia);
    // Convert to Date object, ensuring correct parsing
    const selectedDate = new Date(Dia);

    // Ensure selectedDate is valid
    if (isNaN(selectedDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Get Monday of the selected week
    const startOfWeek = new Date(selectedDate);
    const dayOfWeek = startOfWeek.getDay(); // 0 (Sunday) to 6 (Saturday)
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to Monday if Sunday
    startOfWeek.setDate(startOfWeek.getDate() + offset);

    // Get Sunday of the selected week (If you want only Monday-Friday, use `+4`)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Monday + 6 days = Sunday

    // Format dates to match DB format (YYYY-MM-DD)
    const startOfWeekStr = startOfWeek.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const endOfWeekStr = endOfWeek.toLocaleDateString("en-CA"); // YYYY-MM-DD

    console.log("Fetching registros from:", startOfWeekStr, "to", endOfWeekStr);

    const result = await db.query(
      `SELECT * FROM registro 
       WHERE Profesor_ID = $1 
       AND DATE(dia) BETWEEN $2 AND $3`,
      [Profesor_ID, startOfWeekStr, endOfWeekStr]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching registros:", error);
    res.status(500).json({ error: error.message });
  }
};
