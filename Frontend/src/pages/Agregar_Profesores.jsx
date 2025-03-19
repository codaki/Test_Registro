import axios from "axios";
import React, { useState } from "react";

function Agregar_Profesores() {
  const [formData, setFormData] = useState({
    Cedula: "",
    Username: "",
    UserPassword: null, // Permite null si es profesor
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    RoL_ID: "1", // Default: Administrador
    Email: null, // Solo si es profesor
    docente_id: null, // Solo si es profesor
  });

  const [isProfesor, setIsProfesor] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setIsProfesor(value === "2");

    setFormData({
      ...formData,
      RoL_ID: value,
      UserPassword: value === "2" ? null : "",
      Email: value === "2" ? "" : null,
      docente_id: value === "2" ? "" : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Enviando datos:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuarios",
        formData
      );

      alert(response.data.mensaje);
      console.log("✅ Usuario registrado:", response.data);

      setFormData({
        Cedula: "",
        Username: "",
        UserPassword: null,
        Nombre1: "",
        Nombre2: "",
        Apellido1: "",
        Apellido2: "",
        RoL_ID: "1",
        Email: null,
        docente_id: null,
      });
      setIsProfesor(false);
    } catch (error) {
      alert(
        "❌ Error al registrar usuario. Verifica los datos e intenta de nuevo."
      );
      console.error("❌ Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Rol</label>
          <select
            name="RoL_ID"
            value={formData.RoL_ID}
            onChange={handleRoleChange}
            className="w-full border p-2"
          >
            <option value="1">Administrador</option>
            <option value="2">Profesor</option>
          </select>
        </div>

        {/* Campos comunes */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="Cedula"
            value={formData.Cedula}
            onChange={handleChange}
            placeholder="Cédula"
            className="w-full border p-2"
          />
          <input
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            placeholder="Usuario"
            className="w-full border p-2"
          />
          <input
            type="text"
            name="Nombre1"
            value={formData.Nombre1}
            onChange={handleChange}
            placeholder="Primer Nombre"
            className="w-full border p-2"
          />
          <input
            type="text"
            name="Nombre2"
            value={formData.Nombre2}
            onChange={handleChange}
            placeholder="Segundo Nombre"
            className="w-full border p-2"
          />
          <input
            type="text"
            name="Apellido1"
            value={formData.Apellido1}
            onChange={handleChange}
            placeholder="Primer Apellido"
            className="w-full border p-2"
          />
          <input
            type="text"
            name="Apellido2"
            value={formData.Apellido2}
            onChange={handleChange}
            placeholder="Segundo Apellido"
            className="w-full border p-2 "
          />
        </div>

        {/* Campo de contraseña solo para administradores */}
        {!isProfesor && (
          <div className="my-4 w-[71vh]">
            <input
              type="password"
              name="UserPassword"
              value={formData.UserPassword || ""}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full border p-2"
            />
          </div>
        )}

        {/* Campos adicionales solo si es Profesor */}
        {isProfesor && (
          <div className="grid grid-cols-2 gap-4 my-4">
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full border p-2"
            />
            <input
              type="text"
              name="docente_id"
              value={formData.docente_id}
              onChange={handleChange}
              placeholder="Docente ID"
              className="w-full border p-2"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Registrar Usuario
        </button>
      </form>
    </div>
  );
}

export default Agregar_Profesores;
