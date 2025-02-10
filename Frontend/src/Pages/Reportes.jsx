import { useState } from "react";
import { useLocation } from "react-router-dom";
import Reporte from "../Components/Reporte";
import ReporteNovevades from "../Components/ReporteNovedades";
function Reportes() {
  const location = useLocation();
  const { profesor, from } = location.state || {};
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const months = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  console.log(profesor, from);
  return (
    <>
      <div className="container mx-auto p-4 h-5/6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Reportes</h1>
          <div className="flex gap-4 my-4">
            <select
              className="p-2 border rounded-md"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 border border-gray-200">
            {from === "list" && profesor ? (
              <Reporte
                profesor_id={profesor.profesor_id}
                mes={selectedMonth}
                anio={selectedYear}
              />
            ) : (
              <ReporteNovevades mes={selectedMonth} anio={selectedYear} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reportes;
