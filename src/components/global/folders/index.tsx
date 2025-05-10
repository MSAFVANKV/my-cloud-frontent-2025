import {  renameFolders } from "@/actions/create_Folder/FilesAction";
import { useMainContext } from "@/providers/context/context";
import { IFolderTypes } from "@/types/folder-types";
import { FolderIcon } from "lucide-react";

import {  useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import {  encodeId } from "@/utils/encorder";
import BreadcrumbLine from "../bread-crumbs";
import { Input } from "@/components/ui/input";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";

type Props = {
  showAll?: boolean;
  folders:IFolderTypes[]
  folderId:string
};

function Folders({ folders, folderId }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { viewMode } = useMainContext();
  const [onRename, setOnRename] = useState(false);
  // console.log('Clicked folder ID:', folderId);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);



  const { mutate, isPending } = useMutationData(
    ['rename-folders'],
    (data: { name: string }) => renameFolders(folderId, data.name),
    'workspace-folders',
    Renamed
  )

  const { latestVariables } = useMutationDataState(["rename-folders"]);


  const folderName = useMemo(() => {
    return folders?.find((f) => f._id === folderId);
  }, [folderId, folders]);

  // console.log(folders,'folders');

  const handleFolderClick = (clickedFolderId: string) => {
    if (onRename) return;

    // console.log('Clicked folder ID:', clickedFolderId);  // Add this line to check the ID

    const encodeFolderId = encodeId(clickedFolderId);
    // console.log('Encoded folder ID:', encodeFolderId); // Check if encoding works

    navigate(`/folder/${encodeFolderId}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
    //Rename functionality
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, folderId });
      } else Renamed();
    }
  };



  // if (!folders || folders?.length === 0) {
  //   return <div className="h-32 w-full flex justify-center items-center">
  //     <span className="text-xs capitalize">
  //       No Items
  //     </span>
  //   </div>;
  // }


  return (
    <div className="">
   {onRename ?"true":"false"}

      {/* <div>
        <h2>Folders </h2>
        <pre>{JSON.stringify(folders, null, 2)}</pre>
      </div> */}
      {/* {pathname} */}
      <div className="">
        <BreadcrumbLine folderId={folderId} />
      </div>
      <h2 className="text-xl font-semibold">{folderName?.name}</h2>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {folders
            .filter((f) => f._id !== folderId)
            .map((folder) => (
              <div
                onClick={() => handleFolderClick(folder._id)}
                key={folder._id}
                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <FolderIcon className="text-yellow-500 mb-2" />
                {onRename ? (
                  <Input
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      updateFolderName(e);
                    }}
                    autoFocus
                    placeholder={folder.name}
                    className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
                    ref={inputRef}
                  />
                ) : (
                  <p
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-300"
                    onDoubleClick={handleNameDoubleClick}
                  >
                    {latestVariables &&
                    latestVariables.status === "pending" &&
                    latestVariables.variables.id === folderId
                      ? latestVariables.variables.name
                      : folder.name}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(folder.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="space-y-2">
          {folders
            .filter((f) => f._id !== folderId)
            .map((folder: any) => (
              <div
                key={folder._id}
                onClick={() => handleFolderClick(folder._id)}
                className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm hover:shadow transition"
              >
                <div className="flex items-center gap-3">
                  <FolderIcon className="text-yellow-500" />
                  <div>
                    <div className="font-medium">
                      {folder.name || "Untitled"}
                    </div>
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
