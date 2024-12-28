import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../Components/Table";

const columns = ["Nombres", "Apellidos", "Email", "Profesor ID", "Usuario ID"];

function Lista_Profesores() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/profesores"
        );
        const formattedData = response.data.map((profesor) => ({
          ...profesor,
          nombres: `${profesor.nombre1} ${profesor.nombre2}`,
          apellidos: `${profesor.apellido1} ${profesor.apellido2}`,
        }));
        console.log(formattedData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching profesores:", error);
      }
    };

    fetchProfesores();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Lista Profesores</h1>
      </div>
      <Table
        columns={columns}
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default Lista_Profesores;
