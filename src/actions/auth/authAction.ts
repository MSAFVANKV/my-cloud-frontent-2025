import { GetCurrentUserResponse } from "@/types/globalType";
import { GET_CURRENT_USER, LOGIN_USER, REGISTER_USER } from "@/utils/urlPath";
import axios from "axios";

export const createNewUserAction = async (data: {
  email: string;
  userName: string;
  password: string;
}) => {
  try {
    // console.log(data, "===== data inside action create new user =====");

    const { email, password, userName } = data;

    const response = await axios.post(REGISTER_USER, {
      email,
      password,
      userName,
    });

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
    console.log(data, "===== data inside action create new user =====");

    const { email, password } = data;

    const response = await axios.post(
      LOGIN_USER,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return {
      status: response.status,
      data: response.data.user,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("❌ Authentication error:", error);

    return {
      status: error.response?.status || 500,
      data: null,
      message: error.response?.data?.message || "Something went wrong!",
    };
  }
};

export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  try {
    const response = await axios.get(GET_CURRENT_USER, {
      withCredentials: true,
    });

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
