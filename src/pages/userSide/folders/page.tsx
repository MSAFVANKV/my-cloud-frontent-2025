import { getAllFilesOfUser } from "@/actions/create_Folder/FilesAction";
import { useQueryData } from "@/hooks/useQueryData";
import { IFiles } from "@/types/filesTypes";
import { useParams } from "react-router-dom";
import { FileText, FileImage, FilePen } from "lucide-react"; // Icons for documents
import ImageComponent from "@/components/global/image";
import Loader from "@/components/global/loader";
import { useMainContext } from "@/providers/context/context";

const FolderPage = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { viewMode } = useMainContext();

  console.log(folderId);

  const { data: fetchedFiles, isFetching } = useQueryData(["all-files"], () =>
    getAllFilesOfUser([
      {
        key: "",
        value: "",
      },
    ])
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
    <div className="">
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
                viewMode === "list" ? "flex-row" : "flex-col"
              }  items-center`}
            >
              {/* Show image preview */}
              {file.format.startsWith("image") ? (
                <ImageComponent
                  src={file.src} // Ensure this contains the image URL
                  alt={file.name}
                  className={` flex ${
                    viewMode === "list" ? "w-14 h-14" : "w-full h-36 "
                  } items-center justify-center overflow-hidden`}
                  classNameImg="object-cover w-full h-full rounded-md"
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
              <div className="text-center mt-2">
                <h3 className="text-sm font-medium">{file.name}</h3>
                <p className="text-xs text-gray-500">{file.format}</p>
                <p className="text-xs text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <h3 className="text-center text-lg font-medium text-gray-800">
              No files found in this folder.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderPage;
