import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-4 bg-neutral-100 text-black h-20 shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img src="img/logo_espe_100.png" alt="Logo" className="h-20 w-f " />
        </Link>

        <span className="text-2xl font-bold pl-20">Registro de Asistencia</span>
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
