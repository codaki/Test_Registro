import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Camera_Page from "./Pages/Camera_Page";
import Dashboard from "./Pages/Dashboard";
import Main_Page from "./Pages/Main_Page";

const App = () => {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar className="w-1/4" />
          <div className="flex-1">
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
        <Route path="/Camera_Page" element={<Layout />}>
          <Route index element={<Camera_Page />} />
        </Route>
        <Route path="/Dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
