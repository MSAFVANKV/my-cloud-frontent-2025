import { GET_FILES, UPLOAD_FILES } from "@/utils/urlPath";
import { API } from "../api/route";


// 1. upload files
export const upload_New_File = (formData: any) =>
  API.post(UPLOAD_FILES, formData, { withCredentials: true });



export const Get_All_Files = (
    filters?: { key: string; value: string }[]
  ) => {
    const params: Record<string, string> = {};
  
    if (filters) {
      filters.forEach((filter) => {
        params[filter.key] = filter.value; // ✅ Convert array to query parameters
      });
    }
  
    return API.get(GET_FILES, {
      withCredentials: true,
      params, // ✅ Send dynamic query params
    });
  };