import { API } from "../api/route";
import {
  CREATE_NEW_FOLDER_URL,
  GET_FILES_URL,
  GET_FOLDER_URL,
  UPLOAD_FILES_URL,
} from "../urls/folder-urlPath";

// 1. upload files
export const upload_New_File = (formData: any) =>
  API.post(UPLOAD_FILES_URL, formData, { withCredentials: true });

// 2. upload files
export const create_New_Folder = (name: string, parentId?: string) =>
  API.post(
    CREATE_NEW_FOLDER_URL,
    { name: name, parentId: parentId },
    { withCredentials: true }
  );

  export const rename_Folder = (name: string, folderId: string) =>
    API.put(
      `${CREATE_NEW_FOLDER_URL}/${folderId}`,
      { name: name },
      { withCredentials: true }
    );


  export const getFolders_Api = (filters?: { key: string; value: string }[]) => {
    const params: Record<string, string> = {};
  
    if (filters) {
      filters.forEach((filter) => {
        params[filter.key] = filter.value; // ✅ Convert array to query parameters
      });
    }
  
    return API.get(GET_FOLDER_URL, {
      withCredentials: true,
      params, // ✅ Send dynamic query params
    });
  };

export const Get_All_Files = (filters?: { key: string; value: string }[]) => {
  const params: Record<string, string> = {};

  if (filters) {
    filters.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return API.get(GET_FILES_URL, {
    withCredentials: true,
    params, // ✅ Send dynamic query params
  });
};
