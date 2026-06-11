import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Layout
} from "antd";
const Dashboard = () => {
  return (
    <>
     <Layout
        style={{
          minHeight: "100vh",
        }}
      >
      <Navbar />

      <Outlet />
      </Layout>
    </>
  );
};

export default Dashboard;
