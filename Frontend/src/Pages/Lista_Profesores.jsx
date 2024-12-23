import Table from "../Components/Table";
const columns = ["Name", "Position", "Status", "Action"];
const data = [
  {
    Name: "Neil Sims",
    Position: "React Developer",
    Status: "Online",
    Action: "Edit user",
  },
  {
    Name: "Bonnie Green",
    Position: "Designer",
    Status: "Online",
    Action: "Edit user",
  },
];

function Lista_Profesores() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Lista Profesores</h1>
        </div>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
}

export default Lista_Profesores;
