import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";

function Carga_Excel() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    readExcel(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    readExcel(file);
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 6 });
      const filteredData = jsonData.filter(
        (row) =>
          row[14] !== undefined &&
          row[14] !== "" &&
          row[2] !== undefined &&
          row[2] !== "0"
      );
      setData(filteredData);
    };
    reader.readAsBinaryString(file);
  };

  const headers = [
    "ID DOCENTE",
    "CÉDULA",
    "DOCENTE",
    "ÁREA DE CONOCIMIENTO",
    "NIVEL FORMACION",
    "CODIGO",
    "ASIGNATURA",
    "NRC",
    "PARTE PER.",
    "STATUS",
    "SECCION",
    "# CRED",
    "TIPO",
    "# EST",
    "EDIFICIO",
    "AULA",
    "CAPACIDAD",
    "HI",
    "HF",
    "L",
    "M",
    "I",
    "J",
    "V",
    "S",
    "D",
  ];
  console.log(data[1]);
  const saveToDatabase = async () => {
    const processedDocentes = new Set();

    try {
      for (const row of data.slice(1)) {
        // Skip the first row
        const [idDocente, , docente] = row;

        if (processedDocentes.has(docente)) {
          continue; // Skip if the docente has already been processed
        }

        processedDocentes.add(docente);

        const nameParts = docente.split(/[\s,]+/);

        let apellido1 = "";
        let apellido2 = "";
        let nombre1 = "";
        let nombre2 = "";

        if (nameParts.length === 3) {
          [apellido1, nombre1, nombre2] = nameParts;
        } else if (nameParts.length === 4) {
          [apellido1, apellido2, nombre1, nombre2] = nameParts;
        } else if (nameParts.length === 2) {
          [apellido1, nombre1] = nameParts;
        }

        const usuarioResponse = await axios.post(
          "http://localhost:3000/api/usuarios",
          {
            Username: `${nombre1}.${apellido1}`,
            Password: "defaultPassword", // You might want to generate a secure password
            Nombre1: nombre1,
            Nombre2: nombre2 || "", // Handle cases where there might not be a second name
            Apellido1: apellido1,
            Apellido2: apellido2 || "", // Handle cases where there might not be a second surname
            Rol_ID: 2,
          }
        );

        console.log(nombre1);
        console.log(apellido1);
        console.log(idDocente);
        console.log(usuarioResponse);
        console.log("aaaaaa");
        const usuarioId = usuarioResponse.data.usuario_id;
        console.log(usuarioId);

        await axios.post("http://localhost:3000/api/profesores", {
          profesor_id: idDocente,
          email: `${nombre1}.${apellido1}@example.com`, // You might want to use a real email
          usuario_id: usuarioId,
          docente_id: idDocente,
        });
      }
      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="w-3/4 p-4 border-2 border-dashed border-gray-400 rounded-lg bg-white"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <p className="text-center text-gray-500">
          Arrastra y suelta el archivo Excel aquí o haz clic para cargar
        </p>
      </div>
      {data.length > 0 && (
        <div className="mt-6 w-full overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      id={rowIndex}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={saveToDatabase}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar Profesores
      </button>
    </div>
  );
}

export default Carga_Excel;
