import axios from "axios";
import { apiClient,baseURL } from "@/config";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  Response,
  User,
} from "@/interfaces";

const RegisterUserByUsername = async (
  userData: RegisterUserRequest,
): Promise<Response<unknown, string | null>> => {
  try {
    const response = await apiClient.post("/auth/signup", userData);

    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const LoginUser = async (
  userData: LoginUserRequest,
): Promise<Response<unknown, string | null>> => {
  try {
    const response = await apiClient.post("/auth/signin", userData);

    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors: error.response?.data?.errors ?? "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const GetUserProfile = async (): Promise<Response<User, string | null>> => {
  try {
    const response = await apiClient.get("/auth/me");

    return {
      success: true,
      data: response.data.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors: error.response?.data?.errors ?? "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const LogoutUser = async (): Promise<Response<unknown, string | null>> => {
  try {
    const response = await apiClient.get("/auth/signout");

    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors: error.response?.data?.errors ?? "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const LoginUserByGoogle = async () => {
  window.location.href = `${baseURL}/auth/signin/google`;
};

export { RegisterUserByUsername, LoginUser, GetUserProfile, LogoutUser,LoginUserByGoogle };
