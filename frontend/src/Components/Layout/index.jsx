import Dashboard from "../Dashboard";
import "./Layout.css";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default Layout;
