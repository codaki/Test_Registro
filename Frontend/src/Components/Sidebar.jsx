function Sidebar() {
  return (
    <div className="bg-neutral-100 h-screen w-1/6 shadow-md">
      <div className="flex flex-col items-center">
        <div className="p-4"></div>
        <div className="text-black text-2xl">Menu</div>
        <div className="flex flex-col items-center text-black">
          <a href="/" className="p-4 hover:bg-gray-700 w-full">
            Home
          </a>
          <a href="/Lista_Profesores" className="p-4 hover:bg-gray-700 w-full">
            Profesores
          </a>
          <a href="/Carga_horarios" className="p-4 hover:bg-gray-700 w-full">
            Excel
          </a>
          <a href="/Reporte" className="p-4 hover:bg-gray-700 w-full">
            Reportes
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
