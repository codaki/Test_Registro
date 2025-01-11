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
    RoL_ID: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios', formData);
      console.log('Usuario creado:', response.data);
      // Aquí puedes agregar lógica adicional después de crear el usuario
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Profesor</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
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
            <label className="block mb-2">Rol ID</label>
            <input
              type="text"
              name="RoL_ID"
              value={formData.RoL_ID}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Registrar Profesor
        </button>
      </form>
    </div>
  );
}

export default Agregar_Profesores;