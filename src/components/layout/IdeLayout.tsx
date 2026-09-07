import { Outlet } from "react-router-dom";

const IDELayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Outlet />
    </div>
  );
};

export default IDELayout;
