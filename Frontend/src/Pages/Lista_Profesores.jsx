import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../Components/Table";

const columns = [
  "Nombre1",
  "Nombre2",
  "Apellido1",
  "Apellido2",
  "Email",
  "Profesor ID",
  "Usuario ID",
];

function Lista_Profesores() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/profesores"
        );
        console.log(response.data);
        setData(response.data);
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
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Lista_Profesores;
