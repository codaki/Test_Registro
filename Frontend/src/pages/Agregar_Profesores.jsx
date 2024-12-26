import React, { useState } from 'react';

function Agregar_Profesores() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.zip')) {
      setFile(selectedFile);
    } else {
      alert('Por favor, suba un archivo .zip');
      e.target.value = null; // Reset the input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
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
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Primer Nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre 2</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Segundo Nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido 1</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Primer Apellido"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido 2</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Segundo Apellido"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
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
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="ID del Profesor"
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
                    className="mr-2"
                  />
                  Administrador
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Profesor"
                    className="mr-2"
                  />
                  Profesor
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fotografía</label>
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
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Subir Archivo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Agregar_Profesores;