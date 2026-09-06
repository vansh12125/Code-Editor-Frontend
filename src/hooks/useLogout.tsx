import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/authSlice";
import { LogoutUser } from "@/service/authService";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const useLogout = () => {
  const { dispatch, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const response = await LogoutUser();

    if (response.success) {
      dispatch(logout());
      navigate("/signin", { replace: true });
    }
  };

  return handleLogout;
};
