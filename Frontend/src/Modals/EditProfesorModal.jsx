import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProfesorModal({ isOpen, onClose, profesor, onSave }) {
  const [formData, setFormData] = useState({
    Cedula: "",
    Username: "",
    UserPassword: "",
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    Email: "",
    docente_id: "",
    profesor_id: "", // 🔹 Agregar el ID del profesor
  });

  // Cargar datos actuales del profesor en el formulario
  useEffect(() => {
    if (profesor) {
      console.log("Datos del profesor recibidos en el modal:", profesor); // 🔍 Verifica si `profesor_id` llega correctamente
  
      setFormData({
        Cedula: profesor.cedula || "",
        Username: profesor.username || "",
        UserPassword: profesor.userpassword || "",
        Nombre1: profesor.nombre1 || "",
        Nombre2: profesor.nombre2 || "",
        Apellido1: profesor.apellido1 || "",
        Apellido2: profesor.apellido2 || "",
        Email: profesor.email || "",
        docente_id: profesor.docente_id || "",
        profesor_id: profesor.profesor_id || "", // 🔹 Asegurar que el ID se asigna
      });
    }
  }, [profesor]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/profesores/${profesor.profesor_id}`, formData);
      alert("Datos actualizados correctamente");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      alert("Hubo un error al actualizar los datos.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Profesor</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="Cedula" value={formData.Cedula} onChange={handleChange} placeholder="Cédula" className="w-full mb-2 p-2 border" />
          <input type="text" name="Username" value={formData.Username} onChange={handleChange} placeholder="Usuario" className="w-full mb-2 p-2 border" />
          <input type="text" name="UserPassword" value={formData.UserPassword} onChange={handleChange} placeholder="Nueva Contraseña" className="w-full mb-2 p-2 border" />
          <input type="text" name="Nombre1" value={formData.Nombre1} onChange={handleChange} placeholder="Primer Nombre" className="w-full mb-2 p-2 border" />
          <input type="text" name="Nombre2" value={formData.Nombre2} onChange={handleChange} placeholder="Segundo Nombre" className="w-full mb-2 p-2 border" />
          <input type="text" name="Apellido1" value={formData.Apellido1} onChange={handleChange} placeholder="Primer Apellido" className="w-full mb-2 p-2 border" />
          <input type="text" name="Apellido2" value={formData.Apellido2} onChange={handleChange} placeholder="Segundo Apellido" className="w-full mb-2 p-2 border" />
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} placeholder="Correo" className="w-full mb-2 p-2 border" />
          <input type="text" name="docente_id" value={formData.docente_id} onChange={handleChange} placeholder="Docente ID" className="w-full mb-2 p-2 border" />

          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfesorModal;
