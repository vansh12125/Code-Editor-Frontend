import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/common";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
