import { GET_CURRENT_USER, LOGIN_USER, REGISTER_USER } from "@/utils/urlPath";
import axios from "axios";

export const API = axios.create({
  baseURL: `${
    import.meta.env.MODE == "development"
      ? "http://localhost:8080/api"
      : "https://my-cloud-server-2025.onrender.com/api"
  }`,
  // headers: {
  //     'Content-Type': 'application/json',
  // },
});


export const get_Current_User_Api = () => API.get(GET_CURRENT_USER , { withCredentials: true });


export const login_User_Api = (data: {
  email: string;
  password: string;
}) => API.post(LOGIN_USER, data , { withCredentials: true });


export const register_User_Api = (data: {
  email: string;
  password: string;
  userName: string;
}) => API.post(REGISTER_USER, data , { withCredentials: true });
