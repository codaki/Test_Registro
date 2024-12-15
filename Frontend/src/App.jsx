import React, { useState } from "react";
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
        <Sidebar />
        <Outlet />
      </>
    );
  };

  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="/Camera_Page" element={<Layout />}>
            <Route index element={<Camera_Page />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
