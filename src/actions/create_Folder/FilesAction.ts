import {
  create_New_Folder,
  Get_All_Files,
  getFolders_Api,
} from "@/services/upload/route";

export const getAllFilesOfUser = async (
  filter?: { key: string; value: string }[]
) => {
  try {
    const response = await Get_All_Files(filter);
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: response.status,
        message: response.data.message || "files found successfully",
      };
    }
  } catch (error: any) {
    console.error("Error getting all files:", error);
    return {
      data: [],
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Something went wrong!",
    };
  }
};

// 2. folder sec

export const createFolder = async (name: string, parentId?: string) => {
  try {
    const response = await create_New_Folder(name, parentId);

    if (response.status === 201) {
      return { status: response.status, message: "New Folder Created" };
    }
  } catch  {
    // console.log(error);
    return { status: 500, message: "Oppse something went wrong" };
  }
};

export const getFoldersWithSub = async (filters?: { key: string; value: string }[]) => {
  try {
    const response = await getFolders_Api(filters);

    // console.log(response,'response get folder');
    

    if (response.status === 200) {
      return {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
      };
    }
  } catch {
    // console.log(error,"error in get folders======");
    return { status: 500, message: "Oppse something went wrong", data:[] };
  }
};


// rename 

export const renameFolders = async (folderId: string, name: string) => {
  try {
    // const response = await getFolders_Api(filters);

    // // console.log(response,'response get folder');
    

    // if (response.status === 200) {
    //   return {
    //     status: response.status,
    //     message: response.data.message,
    //     data: response.data.data,
    //   };
    // }
  } catch {
    // console.log(error,"error in get folders======");
    return { status: 500, message: "Oppse something went wrong", data:[] };
  }
};
