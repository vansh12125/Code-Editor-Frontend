import axios from "axios";
import { apiClient } from "@/config";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  Response,
} from "@/interfaces";

const RegisterUserByUsername = async (
  userData: RegisterUserRequest
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

export { RegisterUserByUsername, LoginUser };
