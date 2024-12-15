import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Camera_Page from "./pages/Camera_Page";
import Main_Page from "./pages/Main_Page";

const App = () => {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <div className="flex">
          <Sidebar className="w-1/4" />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main_Page />} />
        <Route path="/Camera_Page" element={<Layout />}>
          <Route index element={<Camera_Page />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
