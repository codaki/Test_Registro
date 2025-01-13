import Calendar from "../Components/Calendar";

function Calendario() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Lista Profesores</h1>
        </div>
        <Calendar profesorId={1} />
      </div>
    </>
  );
}

export default Calendario;
