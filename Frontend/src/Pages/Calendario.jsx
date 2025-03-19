import { useParams } from "react-router-dom";
import Calendar from "../Components/Calendar";
function Calendario() {
  const { id } = useParams();
  return (
    <>
      <div className="container mx-auto p-4 shadow-lg">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Control de Asitencia</h1>
        </div>
        <Calendar profesorId={id} />
      </div>
    </>
  );
}

export default Calendario;
