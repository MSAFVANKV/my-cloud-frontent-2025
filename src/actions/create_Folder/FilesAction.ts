import { Get_All_Files } from "@/services/upload/route"



export const getAllFilesOfUser = async ( filter?: { key: string; value: string }[]) =>{
    try {
        const response = await Get_All_Files(filter);
        if(response.status === 200){
            return {
                data: response.data.files,
                status: response.status,
                message: response.data.message || "files found successfully"
            };
        }
    } catch (error:any) {
        console.error("Error getting all files:", error);
        return {
            data: [],
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong!"
        };
        
    }
}