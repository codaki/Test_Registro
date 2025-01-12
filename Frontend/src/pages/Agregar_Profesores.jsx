import React, { useState } from 'react';
import axios from 'axios';

function Agregar_Profesores() {
  const [formData, setFormData] = useState({
    Cedula: '',
    Username: '',
    UserPassword: '',
    Nombre1: '',
    Nombre2: '',
    Apellido1: '',
    Apellido2: '',
    RoL_ID: '1', // Default to Administrador
    Email: '',
    docente_id: '',
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
    setFormData({
      ...formData,
      RoL_ID: value,
    });
    setIsProfesor(value === '2');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post('http://localhost:3000/api/usuarios', {
        Cedula: formData.Cedula,
        Username: formData.Username,
        UserPassword: formData.UserPassword,
        Nombre1: formData.Nombre1,
        Nombre2: formData.Nombre2,
        Apellido1: formData.Apellido1,
        Apellido2: formData.Apellido2,
        RoL_ID: formData.RoL_ID,
      });
      console.log('Usuario creado:', userResponse.data);

      if (isProfesor) {
        const profesorData = {
          Usuario_ID: userResponse.data.usuario_id, // Asegúrate de que el campo sea correcto
          Email: formData.Email,
          docente_id: formData.docente_id,
        };
        const profesorResponse = await axios.post('http://localhost:3000/api/profesores', profesorData);
        console.log('Profesor creado:', profesorResponse.data);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Cédula</label>
            <input
              type="text"
              name="Cedula"
              value={formData.Cedula}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="UserPassword"
              value={formData.UserPassword}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Primer Nombre</label>
            <input
              type="text"
              name="Nombre1"
              value={formData.Nombre1}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Segundo Nombre</label>
            <input
              type="text"
              name="Nombre2"
              value={formData.Nombre2}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Primer Apellido</label>
            <input
              type="text"
              name="Apellido1"
              value={formData.Apellido1}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Segundo Apellido</label>
            <input
              type="text"
              name="Apellido2"
              value={formData.Apellido2}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          {isProfesor && (
            <>
              <div>
                <label className="block mb-2">Correo</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="block mb-2">Docente ID</label>
                <input
                  type="text"
                  name="docente_id"
                  value={formData.docente_id}
                  onChange={handleChange}
                  className="w-full border p-2"
                />
              </div>
            </>
          )}
        </div>
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