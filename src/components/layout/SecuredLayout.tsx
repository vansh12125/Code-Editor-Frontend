import { Outlet } from "react-router-dom";
import {SecuredNavbar} from "@/components/common";

const SecuredLayout = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-sans text-white select-none">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/dashboard-bg.jpg')",
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/30" />

      <SecuredNavbar />

      <div className="relative z-10 flex h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default SecuredLayout;