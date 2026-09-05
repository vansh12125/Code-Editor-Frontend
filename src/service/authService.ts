import axios from "axios";
import { apiClient } from "@/config";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  Response,
} from "@/interfaces";

const RegisterUserByUsername = async (
  userData: RegisterUserRequest,
): Promise<Response> => {
  try {
    const response = await apiClient.post("/auth/signup", userData);

    return {
      success: true,
      data: response.data,
      errors: null,
    } as Response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors: error.response?.data ?? {
          message: "Something went wrong",
        },
      } as Response;
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
