import { useState, useEffect } from "react";

function Carga_Fotos() {
  const [imagenes, setImagenes] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("");

  // Cargar profesores desde la API
  useEffect(() => {
    fetch("http://localhost:3000/api/profesores")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener profesores");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profesores obtenidos:", data); // Verificar datos en consola
        setProfesores(data);
      })
      .catch((error) => console.error("Error en la API:", error));
  }, []);

  const manejarArrastre = (evento) => {
    evento.preventDefault();
  };

  const manejarSoltar = (evento) => {
    evento.preventDefault();
    const archivos = Array.from(evento.dataTransfer.files);
    const imagenesFiltradas = archivos.filter(
      (archivo) => archivo.type === "image/jpeg"
    );

    if (imagenesFiltradas.length > 0) {
      setImagenes((prev) => [...prev, ...imagenesFiltradas]);
    }
  };

  const manejarSeleccionProfesor = (evento) => {
    setProfesorSeleccionado(evento.target.value);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Subir Fotos</h2>

      {/* Desplegable de profesores */}
      <label className="block mb-2 text-sm font-medium">Seleccionar Profesor:</label>
      <select
        value={profesorSeleccionado}
        onChange={manejarSeleccionProfesor}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">Seleccione un profesor</option>
        {profesores.map((profesor) => (
          <option key={profesor.profesor_id} value={profesor.profesor_id}>
            {`${profesor.nombre1} ${profesor.nombre2 || ""} ${profesor.apellido1} ${profesor.apellido2 || ""}`.trim()}
          </option>
        ))}
      </select>

      {/* Área para arrastrar imágenes */}
      <div
        className="border-dashed border-2 border-gray-400 p-6 text-center rounded-md cursor-pointer"
        onDragOver={manejarArrastre}
        onDrop={manejarSoltar}
      >
        Arrastra aquí tus imágenes en formato JPG
      </div>

      {/* Contador de imágenes */}
      <p className="mt-2 text-sm text-gray-600">
        {imagenes.length} imagen(es) cargada(s)
      </p>

      {/* Tabla de imágenes cargadas */}
      {imagenes.length > 0 && (
        <table className="mt-4 border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Previsualización</th>
              <th className="border p-2">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {imagenes.map((imagen, index) => (
              <tr key={index} className="border">
                <td className="border p-2">
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt="Vista previa"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{imagen.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Carga_Fotos;
