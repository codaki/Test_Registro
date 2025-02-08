import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../Components/Table";
import EditProfesorModal from "../Modals/EditProfesorModal";

const columns = [
  "Nombres",
  "Apellidos",
  "Email",
  "Profesor ID",
  "Usuario ID",
  "Porcentaje Asistencia",
];

function Lista_Profesores() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfesores = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:3000/api/profesores");
      const formattedData = response.data.map((profesor) => ({
        ...profesor,
        nombres: `${profesor.nombre1 ?? ""} ${profesor.nombre2 ?? ""}`.trim(),
        apellidos: `${profesor.apellido1 ?? ""} ${profesor.apellido2 ?? ""}`.trim(),
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching profesores:", error);
      setError("No se pudo cargar la lista de profesores.");
    }
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  // ✅ Obtener datos completos antes de abrir el modal
  const handleEdit = async (profesorId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profesores/${profesorId}`);
      setSelectedProfesor(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles del profesor:", error);
      alert("No se pudo cargar la información del profesor.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Lista Profesores</h1>
      </div>

      {error ? (
        <div className="text-red-500 bg-red-100 p-3 rounded-md">{error}</div>
      ) : (
        <Table
          columns={columns}
          data={data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onEdit={handleEdit} // ✅ Pasamos la función de edición
          refreshData={fetchProfesores} // ✅ Para actualizar la lista después de una acción
        />
      )}

      <EditProfesorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profesor={selectedProfesor}
        onSave={fetchProfesores} // ✅ Recargar datos tras editar
      />
    </div>
  );
}

export default Lista_Profesores;
