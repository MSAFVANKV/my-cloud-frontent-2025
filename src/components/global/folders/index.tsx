import { getFoldersWithSub } from "@/actions/create_Folder/FilesAction";
import { useQueryData } from "@/hooks/useQueryData";
import { useMainContext } from "@/providers/context/context";
import { IFolderTypes } from "@/types/folder-types";
import { FolderIcon } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import Loader from "../loader";

// type Props = {
//   parentId: string;
// };

function Folders() {
  const { viewMode } = useMainContext();
  const { folderId } = useParams<{ folderId: string }>();

  const { data: fetchedData, isFetching } = useQueryData(
    ["workspace-folders", folderId],
    () =>
      getFoldersWithSub(
        folderId ? [{ key: "parentId", value: folderId }] : undefined
      )
  );

  const { data: folders } = (fetchedData ?? {}) as {
    status?: number;
    data?: IFolderTypes[];
  };

  // console.log(folders,'folders');

  // if (!isFetched || !folders) return <div>Loading folders...</div>;
  if (isFetching)
    return (
      <div className="flex justify-center items-center bg-black/10  h-full w-full">
        <Loader state={true} />
      </div>
    );

  // if (!folders || folders?.length === 0) {
  //   return <div className="h-32 w-full flex justify-center items-center">
  //     <span className="text-xs capitalize">
  //       No Items
  //     </span>
  //   </div>;
  // }
  if (!folders || folders?.length === 0) {
    return null
  }

  return (
    <div className="">
      {/* <div>
        <h2>Folders </h2>
        <pre>{JSON.stringify(folders, null, 2)}</pre>
      </div> */}
      <h2 className="text-xl font-semibold mb-4">Folders</h2>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <Link
              to={`/${folder._id}`}
              key={folder._id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <FolderIcon className="text-yellow-500 mb-2" />
              <div className="font-medium truncate">
                {folder.name || "Untitled"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(folder.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {folders.map((folder: any) => (
            <div
              key={folder._id}
              className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                <FolderIcon className="text-yellow-500" />
                <div>
                  <div className="font-medium">{folder.name || "Untitled"}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(folder.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {folder.published ? "Published" : "Unpublished"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Folders;
