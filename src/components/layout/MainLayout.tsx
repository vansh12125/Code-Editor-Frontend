import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@/components/common";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
