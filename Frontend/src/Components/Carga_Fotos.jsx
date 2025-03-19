import { useEffect, useState } from "react";
import Modal from "./Modal"; // Asegúrate de importar el modal

function Carga_Fotos() {
  const [imagenes, setImagenes] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("");
  const [modal, setModal] = useState({ show: false, title: "", message: "" });

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
        console.log("Profesores obtenidos:", data);
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

  const mostrarModal = (title, message) => {
    setModal({ show: true, title, message });
  };

  const cerrarModal = () => {
    setModal({ show: false, title: "", message: "" });
  };

  const guardarFotos = async () => {
    if (!profesorSeleccionado) {
      mostrarModal(
        "Error",
        "Seleccione un profesor antes de guardar las fotos."
      );
      return;
    }

    const profesor = profesores.find(
      (p) => p.profesor_id == profesorSeleccionado
    );
    if (!profesor) {
      mostrarModal("Error", "Profesor no encontrado.");
      return;
    }

    const nombreCarpeta = `${profesor.apellido1.toLowerCase()}_${
      profesor.apellido2 ? profesor.apellido2.toLowerCase() + "_" : ""
    }${profesor.nombre1.toLowerCase()}_${
      profesor.nombre2 ? profesor.nombre2.toLowerCase() : ""
    }`.trim();

    const imagenesBase64 = await Promise.all(
      imagenes.map(async (imagen) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(imagen);
          reader.onloadend = () => {
            resolve({
              nombre: imagen.name,
              data: reader.result.split(",")[1],
            });
          };
        });
      })
    );

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
        mostrarModal("Éxito", "Fotos guardadas con éxito.");
        setImagenes([]);
      })
      .catch((error) => {
        console.error("Error al subir imágenes:", error);
        mostrarModal("Error", "Hubo un problema al subir las fotos.");
      });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Subir Fotos</h2>

      <label className="block mb-2 text-sm font-medium">
        Seleccionar Profesor:
      </label>
      <select
        value={profesorSeleccionado}
        onChange={manejarSeleccionProfesor}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">Seleccione un profesor</option>
        {profesores.map((profesor) => (
          <option key={profesor.profesor_id} value={profesor.profesor_id}>
            {`${profesor.nombre1} ${profesor.nombre2 || ""} ${
              profesor.apellido1
            } ${profesor.apellido2 || ""}`.trim()}
          </option>
        ))}
      </select>

      <div
        className="border-dashed border-2 border-gray-400 p-6 text-center rounded-md cursor-pointer"
        onDragOver={manejarArrastre}
        onDrop={manejarSoltar}
      >
        Arrastra aquí tus imágenes en formato JPG
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {imagenes.length} imagen(es) cargada(s)
      </p>

      {imagenes.length > 0 && (
        <div className="mt-4 max-h-96 overflow-y-auto">
          <table className="border-collapse border w-full">
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
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={guardarFotos}
        disabled={imagenes.length === 0}
      >
        Guardar Fotos
      </button>

      {/* Modal de confirmación o error */}
      <Modal
        show={modal.show}
        onClose={cerrarModal}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}

export default Carga_Fotos;
