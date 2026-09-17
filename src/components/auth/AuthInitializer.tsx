import { useEffect } from "react";
import { GetUserProfile } from "@/service/authService";
import { useAuth } from "@/hooks";
import {
  login,
  logout,
  finishInitialization,
} from "@/redux/authSlice";

const AuthInitializer = () => {
  const { dispatch } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      const response = await GetUserProfile();

      if (response.success && response.data) {
        dispatch(
          login({
            user: response.data,
          }),
        );
      } else {
        dispatch(logout());
      }

      dispatch(finishInitialization());
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;