import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserProfile } from "@/service/authService";
import { useAuth } from "@/hooks";
import { login } from "@/redux";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await GetUserProfile();

        if (userResponse.success && userResponse.data != null) {
          dispatch(
            login({
              user: userResponse.data,
            }),
          );

          navigate("/dashboard", { replace: true });
        }
      } catch {
        navigate("/signin", { replace: true });
      }
    };
    getUser();
  }, [dispatch, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      Signing you in...
    </div>
  );
};

export default OAuthSuccess;
