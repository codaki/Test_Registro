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

  const guardarFotos = async () => {
    if (!profesorSeleccionado) {
      alert("Seleccione un profesor antes de guardar las fotos.");
      return;
    }

    const profesor = profesores.find((p) => p.profesor_id == profesorSeleccionado);
    if (!profesor) {
      alert("Profesor no encontrado.");
      return;
    }

    // Crear nombre de carpeta con formato apellido1_apellido2_nombre1_nombre2
    const nombreCarpeta = `${profesor.apellido1.toLowerCase()}_${profesor.apellido2 ? profesor.apellido2.toLowerCase() + "_" : ""}${profesor.nombre1.toLowerCase()}_${profesor.nombre2 ? profesor.nombre2.toLowerCase() : ""}`.trim();

    // Convertir imágenes a Base64 y enviarlas al servidor
    const imagenesBase64 = await Promise.all(
      imagenes.map(async (imagen) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(imagen);
          reader.onloadend = () => {
            resolve({
              nombre: imagen.name,
              data: reader.result.split(",")[1], // Eliminar el prefijo "data:image/jpeg;base64,"
            });
          };
        });
      })
    );

    // Enviar las imágenes al servidor Python
    fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profesor: nombreCarpeta,
        imagenes: imagenesBase64,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        alert("Fotos guardadas con éxito");
        setImagenes([]); // Limpiar lista después de subirlas
      })
      .catch((error) => console.error("Error al subir imágenes:", error));
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

      {/* Botón para guardar imágenes */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={guardarFotos}
        disabled={imagenes.length === 0}
      >
        Guardar Fotos
      </button>
    </div>
  );
}

export default Carga_Fotos;
