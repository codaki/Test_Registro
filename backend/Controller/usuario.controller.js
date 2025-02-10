import { db } from "../db.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM usuario");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios", detalles: error.message });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM usuario WHERE Usuario_ID = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario", detalles: error.message });
  }
};

export const getProfesorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT u.*, p.Email, p.docente_id FROM Usuario u INNER JOIN Profesor p ON u.Usuario_ID = p.Usuario_ID WHERE p.Profesor_ID = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener profesor", detalles: error.message });
  }
};


// Crear un nuevo usuario y profesor si aplica
export const createUsuario = async (req, res) => {
  try {
    console.log("🔍 Datos recibidos en el backend:", req.body);

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

    if (!Cedula || !Username || !Nombre1 || !Apellido1 || !RoL_ID) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben estar llenos" });
    }

    const rolIdInt = parseInt(RoL_ID);

    // Insertar usuario en la tabla Usuario
    const result = await db.query(
      "INSERT INTO Usuario (Cedula, Username, UserPassword, Nombre1, Nombre2, Apellido1, Apellido2, RoL_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING Usuario_ID, Cedula, Username, Nombre1, Nombre2, Apellido1, Apellido2, RoL_ID",
      [Cedula, Username, UserPassword, Nombre1, Nombre2, Apellido1, Apellido2, rolIdInt]
    );

    const newUser = result.rows[0]; // Extraemos el usuario creado
    console.log("✅ Usuario creado:", newUser);

    let profesorData = null;

    // Si el usuario es Profesor, insertar en la tabla Profesor
    if (rolIdInt === 2) {
      if (!Email || !docente_id) {
        return res.status(400).json({ error: "Email y Docente ID son obligatorios para profesores" });
      }

      const profesorResult = await db.query(
        "INSERT INTO Profesor (Usuario_ID, Email, docente_id) VALUES ($1, $2, $3) RETURNING *",
        [newUser.usuario_id, Email, docente_id]
      );

      profesorData = profesorResult.rows[0];
      console.log("✅ Profesor creado:", profesorData);
    }

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      Usuario: newUser,
      Profesor: profesorData,
    });

  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
  }
};

export const updateProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { Cedula, Username, UserPassword, Nombre1, Nombre2, Apellido1, Apellido2, Email, docente_id } = req.body;

    await db.query(
      "UPDATE usuario SET Cedula = $1, Username = $2, UserPassword = $3, Nombre1 = $4, Nombre2 = $5, Apellido1 = $6, Apellido2 = $7 WHERE Usuario_ID = (SELECT Usuario_ID FROM Profesor WHERE Profesor_ID = $8)",
      [Cedula, Username, UserPassword, Nombre1, Nombre2, Apellido1, Apellido2, id]
    );

    await db.query("UPDATE Profesor SET Email = $1, docente_id = $2 WHERE Profesor_ID = $3", [Email, docente_id, id]);

    res.status(200).json({ mensaje: "Profesor actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el profesor", detalles: error.message });
  }
};


// Actualizar un usuario por ID
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Cedula,
      Username,
      UserPassword,
      Nombre1,
      Nombre2,
      Apellido1,
      Apellido2,
      RoL_ID,
    } = req.body;

    const result = await db.query(
      "UPDATE usuario SET Username = $1, UserPassword = $2, Nombre1 = $3, Nombre2 = $4, Apellido1 = $5, Apellido2 = $6, RoL_ID = $7, Cedula = $8 WHERE Usuario_ID = $9 RETURNING *",
      [Username, UserPassword, Nombre1, Nombre2, Apellido1, Apellido2, RoL_ID, Cedula, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario actualizado correctamente", usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario", detalles: error.message });
  }
};

// Eliminar un usuario por ID (y su profesor si es necesario)
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario es un profesor
    const profesorCheck = await db.query("SELECT * FROM Profesor WHERE Usuario_ID = $1", [id]);

    if (profesorCheck.rows.length > 0) {
      // Eliminar primero al profesor si existe
      await db.query("DELETE FROM Profesor WHERE Usuario_ID = $1", [id]);
    }

    // Eliminar al usuario
    const result = await db.query("DELETE FROM usuario WHERE Usuario_ID = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario", detalles: error.message });
  }
};
