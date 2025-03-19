import { useState } from "react";
import {
  FaCalendarAlt,
  FaChartBar,
  FaCreativeCommonsBy,
  FaFileExcel,
  FaHome,
  FaUser,
  FaUsers,
} from "react-icons/fa";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-neutral-100 h-screen border-black shadow-2xl flex flex-col transition-all duration-700 ${
        isCollapsed ? "w-16" : "w-1/6"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 bg-gray-700 text-white rounded m-2 text-sm  self-end"
      >
        {isCollapsed ? ">" : "<"}
      </button>
      <div id="primero" className="flex flex-col items-center text-black mt-4 ">
        <a
          href="/"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        >
          <FaHome className="text-xl" />
          {!isCollapsed && <span className="ml-2 ">Home</span>}
        </a>
        <a
          href="/Lista_Profesores"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        >
          <FaUsers className="text-xl" />
          {!isCollapsed && <span className="ml-2">Profesores</span>}
        </a>
        <a
          href="/Agregar_Profesores"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        >
          <FaCreativeCommonsBy className="text-xl" />
          {!isCollapsed && <span className="ml-2">Agregar</span>}
        </a>
        <a
          href="/Carga_horarios"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        >
          <FaFileExcel className="text-xl" />
          {!isCollapsed && <span className="ml-2">Excel</span>}
        </a>
        <a
          href="/Reporte"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        >
          <FaChartBar className="text-xl" />
          {!isCollapsed && <span className="ml-2">Reportes</span>}
        </a>
        {/* <a
          href="/Calendario"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        > */}
        {/* <FaCalendarAlt className="text-xl" />
          {!isCollapsed && <span className="ml-2">Calendario</span>}
        </a> */}
        <a
          href="/Entrenamiento"
          className="flex items-center w-full p-4 hover:bg-gray-700 hover:text-white justify-center"
        >
          <FaUser className="text-xl" />
          {!isCollapsed && <span className="ml-2">Entrenamiento</span>}
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
