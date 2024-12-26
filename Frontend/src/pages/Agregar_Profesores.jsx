import React, { useState } from 'react';

function Agregar_Profesores() {
  const [formData, setFormData] = useState({
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    email: '',
    profesorId: '',
    username: '',
    password: '',
    role: ''
  });
  const [file, setFile] = useState(null);
  
  // Definimos la URL base del backend
  const API_URL = 'http://localhost:3000/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.zip')) {
      setFile(selectedFile);
    } else {
      alert('Por favor, suba un archivo .zip');
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Primero creamos el rol
      const rolResponse = await fetch('http://localhost:3000/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Rol_Nombre: formData.role,
          Rol_Permiso: formData.role === 'Administrador' ? 'admin' : 'profesor'
        })
      });

      if (!rolResponse.ok) {
        const errorData = await rolResponse.json();
        throw new Error(errorData.message || 'Error al crear el rol');
      }

      const rolData = await rolResponse.json();
      console.log('Rol creado:', rolData);

      // Luego creamos el usuario
      const usuarioResponse = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: formData.username,
          Password: formData.password,
          Nombre1: formData.nombre1,
          Nombre2: formData.nombre2,
          Apellido1: formData.apellido1,
          Apellido2: formData.apellido2,
          Rol_ID: rolData.Rol_Id
        })
      });

      if (!usuarioResponse.ok) {
        const errorData = await usuarioResponse.json();
        throw new Error(errorData.message || 'Error al crear el usuario');
      }

      const usuarioData = await usuarioResponse.json();
      console.log('Usuario creado:', usuarioData);

      alert('Profesor registrado exitosamente');
      setFormData({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        email: '',
        profesorId: '',
        username: '',
        password: '',
        role: ''
      });
      setFile(null);
      
    } catch (error) {
      console.error('Error al registrar el profesor:', error);
      alert(`Error al registrar el profesor: ${error.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>

      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre 1</label>
              <input
                type="text"
                name="nombre1"
                value={formData.nombre1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Primer Nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre 2</label>
              <input
                type="text"
                name="nombre2"
                value={formData.nombre2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Segundo Nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido 1</label>
              <input
                type="text"
                name="apellido1"
                value={formData.apellido1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Primer Apellido"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido 2</label>
              <input
                type="text"
                name="apellido2"
                value={formData.apellido2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Segundo Apellido"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Correo Electrónico"
              />
            </div>
          </div>

          {/* Second Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Profesor ID</label>
              <input
                type="text"
                name="profesorId"
                value={formData.profesorId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="ID del Profesor"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Usuario"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Contraseña"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rol</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Administrador"
                    checked={formData.role === 'Administrador'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Administrador
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Profesor"
                    checked={formData.role === 'Profesor'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Profesor
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fotografías</label>
              <div
                className="border-dashed border-2 border-gray-300 p-4 rounded cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              >
                {file ? file.name : "Arrastra aquí un archivo .zip o haz clic para subirlo"}
              </div>
              <input
                id="fileInput"
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Agregar_Profesores;