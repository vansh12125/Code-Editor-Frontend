import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

const ProtectedRoute = () => {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;