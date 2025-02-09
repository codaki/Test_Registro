import { useLocation } from "react-router-dom";
import Reporte from "../Components/Reporte";
import ReporteNovevades from "../Components/ReporteNovedades";
function Reportes() {
  const location = useLocation();
  const { profesor, from } = location.state || {};
  console.log(profesor, from);
  return (
    <>
      <div className="container mx-auto p-4 h-5/6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Reportes</h1>
          <div className="mb-4 border border-gray-200">
            {from === "list" && profesor ? (
              <Reporte profesor_id={profesor.profesor_id} />
            ) : (
              <ReporteNovevades />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reportes;
