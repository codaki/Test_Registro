import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Agregar_Profesores from "./pages/Agregar_Profesores";
import Calendario from "./Pages/Calendario";
import Carga_horarios from "./Pages/Carga_horarios";
import Dashboard from "./Pages/Dashboard";
import Entrenamiento from "./Pages/Entrenamiento";
import Lista_Profesores from "./Pages/Lista_Profesores";
import Login from "./pages/Login";
//import Main_Page from "./Pages/Main_Page";
import RegistroAsistencia from "./Pages/Registro_Asistencia";
import Reportes from "./Pages/Reportes";
const App = () => {
  const Layout = () => {
    const location = useLocation();

    // Rutas en las que no se muestran Navbar ni Sidebar
    const noSidebarNavbarRoutes = ["/RegistroAsistencia"];

    const shouldShowLayout = !noSidebarNavbarRoutes.includes(location.pathname);

    return (
      <div>
        {shouldShowLayout && <Navbar />}
        <div className="flex ">
          {shouldShowLayout && <Sidebar />}
          <div className={`flex-1 ${!shouldShowLayout && "w-full"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Lista_Profesores />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Carga_horarios" element={<Layout />}>
          <Route index element={<Carga_horarios />} />
        </Route>
        <Route path="/Lista_Profesores" element={<Layout />}>
          <Route index element={<Lista_Profesores />} />
        </Route>
        <Route path="/Agregar_Profesores" element={<Layout />}>
          <Route index element={<Agregar_Profesores />} />
        </Route>
        <Route path="/RegistroAsistencia" element={<RegistroAsistencia />} />
        <Route path="/Dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/Reporte" element={<Layout />}>
          <Route index element={<Reportes />} />
        </Route>
        <Route path="/Calendario" element={<Layout />}>
          <Route path="/Calendario/:id" element={<Calendario />} />
        </Route>
        <Route path="/Entrenamiento" element={<Layout />}>
          <Route index element={<Entrenamiento />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
