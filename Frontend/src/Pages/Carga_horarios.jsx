import Carga_Excel from "../Components/Carga_Excel";

function Carga_horarios() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Carga de horarios</h1>
        </div>
        <Carga_Excel />
      </div>
    </>
  );
}

export default Carga_horarios;
