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
      setData(jsonData);
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
          Arrastra y suelta un archivo Excel aquí o haz clic para cargar
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
    </div>
  );
}

export default Carga_Excel;
