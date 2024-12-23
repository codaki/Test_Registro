import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Main_Page from "./Pages/Main_Page";
import Login from "./pages/Login";
import RegistroAsistencia from "./pages/RegistroAsistencia";

const App = () => {
  const Layout = () => {
    const location = useLocation();

    // Rutas en las que no se muestran Navbar ni Sidebar
    const noSidebarNavbarRoutes = ["/RegistroAsistencia"];

    const shouldShowLayout = !noSidebarNavbarRoutes.includes(location.pathname);

    return (
      <div>
        {shouldShowLayout && <Navbar />}
        <div className="flex">
          {shouldShowLayout && <Sidebar className="w-1/4" />}
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
        <Route path="/" element={<Main_Page />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegistroAsistencia" element={<RegistroAsistencia />} />
        <Route path="/Dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
