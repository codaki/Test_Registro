import { useLocation } from "react-router-dom";
import Reporte from "../Components/Reporte";

function Reportes() {
  const location = useLocation();
  const { profesor } = location.state || {};

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Reportes</h1>
          <div className="mb-4 border border-gray-200">
            {profesor ? (
              <Reporte
                nombres={`${profesor.nombre1} ${profesor.nombre2}`}
                apellidos={`${profesor.apellido1} ${profesor.apellido2}`}
                cedula={profesor.usuario_id}
                codigo={profesor.profesor_id}
                // Agrega otros campos necesarios para el reporte
              />
            ) : (
              <p>No se ha seleccionado ningún profesor.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reportes;
