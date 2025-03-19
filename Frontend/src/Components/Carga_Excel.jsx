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
        const [idDocente, cedula, docente] = row;

        if (processedDocentes.has(docente)) {
          continue;
        }

        processedDocentes.add(docente);

        const nameParts = docente.split(/[\s,]+/);

        let apellido1 = "";
        let apellido2 = "";
        let nombre1 = "";
        let nombre2 = "";

        if (nameParts.length >= 4) {
          apellido1 = nameParts.slice(0, 2).join(" ");
          apellido2 = nameParts.slice(2, -2).join(" ");
          nombre1 = nameParts[nameParts.length - 2];
          nombre2 = nameParts[nameParts.length - 1];
        } else if (nameParts.length === 3) {
          [apellido1, nombre1, nombre2] = nameParts;
        } else if (nameParts.length === 4) {
          [apellido1, apellido2, nombre1, nombre2] = nameParts;
        } else if (nameParts.length === 2) {
          [apellido1, nombre1] = nameParts;
        }

        const usuarioResponse = await axios.post(
          "http://localhost:3000/api/usuarios",
          {
            Cedula: cedula,
            Username: `${nombre1}.${apellido1}`,
            Password: "defaultPassword",
            Nombre1: nombre1,
            Nombre2: nombre2 || "",
            Apellido1: apellido1,
            Apellido2: apellido2 || "",
            RoL_ID: 2,
          }
        );

        const usuarioId = usuarioResponse.data.usuario_id;
        await axios.post("http://localhost:3000/api/profesores", {
          profesor_id: idDocente,
          email: `${nombre1}.${apellido1}@example.com`,
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
  const saveHorarioToDatabase = async () => {
    try {
      for (const row of data.slice(1)) {
        const horario = {
          asignatura: row[6],
          nrc: row[7],
          edificio: row[14],
          aula: row[15],
          hora_ingreso: row[17],
          hora_finalizacion: row[18],
          clase_lunes: row[19] ? true : false,
          clase_martes: row[20] ? true : false,
          clase_miercoles: row[21] ? true : false,
          clase_jueves: row[22] ? true : false,
          clase_viernes: row[23] ? true : false,
        };

        await axios.post("http://localhost:3000/api/horarios/cargar", {
          docente_id: row[0],
          horario,
        });
      }
      alert("Horarios saved successfully");
    } catch (error) {
      console.error("Error saving horarios:", error);
      alert("Error saving horarios");
    }
  };

  return (
    <div>
      {!data.length > 0 && (
        <div className=" flex flex-col items-center h-screen min-h-screen justify-center bg-gray-100">
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
        </div>
      )}
      {data.length > 0 && (
        <div className=" flex flex-col w-[140vh] items-center h-[85vh] bg-gray-100">
          <div className="mt-4 w-[135vh] h-[75vh] overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-b border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-2 px-4 border-b border-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
          <div className="flex justify-center w-11/12 h-14 my-4">
            <button
              onClick={saveToDatabase}
              className=" bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
              Guardar Profesores
            </button>
            <button
              onClick={saveHorarioToDatabase}
              className=" bg-green-500 text-white px-4 py-2 rounded"
            >
              Guardar Horarios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carga_Excel;
