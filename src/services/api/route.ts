import axios from "axios";

export const API = axios.create({
    baseURL: `${
    import.meta.env.MODE == "development"
      ? "http://localhost:8080/api"
      : "https://my-cloud-server-2025.onrender.com"
  }`,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

