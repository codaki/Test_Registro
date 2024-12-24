import Reporte from "../Components/Reporte";

function Reportes() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Reportes</h1>
          <div className="mb-4 border border-gray-200">
            <Reporte />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reportes;
