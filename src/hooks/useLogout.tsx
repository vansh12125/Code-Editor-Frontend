import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/authSlice";
import { LogoutUser } from "@/service/authService";
import { useAuth } from "./useAuth";

export const useLogout = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await LogoutUser();

    dispatch(logout());

    if (response.success) {
      navigate("/signin", { replace: true });
    }
  };

  return handleLogout;
};