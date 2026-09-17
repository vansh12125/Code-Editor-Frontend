import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

const PublicRoute = () => {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;