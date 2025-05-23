import { getAllFilesOfUser } from "@/actions/create_Folder/FilesAction";
import { useQueryData } from "@/hooks/useQueryData";
import { IFiles } from "@/types/filesTypes";
import { useParams } from "react-router-dom";
import { FileText, FileImage, FilePen } from "lucide-react"; // Icons for documents
import Loader from "@/components/global/loader";
import { useMainContext } from "@/providers/context/context";
import { decodeId } from "@/utils/encorder";
import FileModal from "./file_modal";



function AllFiles() {
    const { folderId } = useParams<{ folderId: string }>();
    const { viewMode } = useMainContext();

  const decodedFolderId =  folderId ? decodeId(folderId) : "";

  
    // console.log(folderId);
  
    const { data: fetchedFiles, isFetching } = useQueryData(["all-files",folderId], () =>
      getAllFilesOfUser( decodedFolderId
        ? [{ key: "folderId", value: decodedFolderId }]
        : undefined),
        {disableRefetch:true}
    );
  
    const { data: files = [] } = (fetchedFiles ?? {}) as {
      status?: number;
      data?: IFiles[];
    };
  
    if (isFetching)
        return (
          <div className="flex justify-center items-center bg-black/10  h-full w-full">
            <Loader state={true} />
          </div>
        );
    
  return (
    <div>
          <div
        className={` grid ${
          viewMode === "list"
            ? "grid-cols-1"
            : "2xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1"
        }   gap-4`}
      >
        {files && files.length ? (
          files.map((file) => (
            <div
              key={file._id}
              className={`bg-white p-3 shadow-md rounded-lg flex ${
                viewMode === "list" ? "flex-row gap-4 items-start js" : "flex-col"
              }  items-center border`}
            >
              {/* Show image preview */}
              {file.format.startsWith("image") ? (
                <FileModal 
                file={file}
                viewMode={viewMode}
                />
              ) : (
                //   <div className="w-full h-40 flex items-center justify-center overflow-hidden">

                //   </div>
                // Show icons for non-image files
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-md">
                  {file.format === "application/pdf" ? (
                    <FilePen className="w-12 h-12 text-red-500" />
                  ) : file.format.startsWith("text") ||
                    file.format.includes("word") ||
                    file.format.includes("excel") ? (
                    <FileText className="w-12 h-12 text-blue-500" />
                  ) : (
                    <FileImage className="w-12 h-12 text-gray-500" />
                  )}
                </div>
              )}

              {/* File details */}
              <div className={` ${ viewMode === "list" ? "":"text-center mt-2"}  `}>
                <h3 className="text-sm font-medium">{file.name}</h3>
                <p className="text-xs text-gray-500">{file.format}</p>
                <p className="text-xs text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-32 w-full flex justify-center items-center">
          <span className="text-xs capitalize">
            No Items
          </span>
        </div>
        )}
      </div>
    </div>
  )
}

export default AllFiles