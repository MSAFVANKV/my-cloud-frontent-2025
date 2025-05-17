import {
  get_Current_User_Api,
  login_User_Api,
  register_User_Api,
} from "@/services/api/route";
import { GetCurrentUserResponse } from "@/types/globalType";

export const createNewUserAction = async (data: {
  email: string;
  userName: string;
  password: string;
}) => {
  try {
    // console.log(data, "===== data inside action create new user =====");

    const response = await register_User_Api(data);

    return {
      status: response.status,
      data: response.data.user,
      message: response.data.message,
    };
  } catch (error: any) {
    // console.error("❌ Authentication error:", error);

    return {
      status: error.response?.status || 500,
      data: null,
      message: error.response?.data?.message || "Something went wrong!",
    };
  }
};

// =========
export const loginUserAction = async (data: {
  email: string;

  password: string;
}) => {
  try {
    console.log("===== data inside action create new user =====");

    // const { email, password } = data;

    const response = await login_User_Api(data);

    return {
      status: response.status,
      data: response.data.user,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("❌ Authentication error:", error);

    return {
      status: error.response?.status || 500,
      data: [],
      message: error.response?.data?.message || "Something went wrong!",
    };
  }
};

export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  try {
    const response = await get_Current_User_Api();

    return {
      status: response.status,
      data: response.data.user,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("�� Authentication error:", error);

    return {
      status: error.response?.status || 500,
      data: null,
      message: error.response?.data?.message || "Something went wrong!",
    };
  }
};
