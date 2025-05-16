import { renameFolders } from "@/actions/create_Folder/FilesAction";
import { useMainContext } from "@/providers/context/context";
import { IFolderTypes } from "@/types/folder-types";
import { FolderIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { encodeId } from "@/utils/encorder";
import BreadcrumbLine from "../bread-crumbs";
import { Input } from "@/components/ui/input";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type Props = {
  showAll?: boolean;
  folders: IFolderTypes[];
  folderId: string;
};

function Folders({ folders, folderId }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { viewMode } = useMainContext();
  const [onRename, setOnRename] = useState(false);
  const [renameFolderId, setRenameFolderId] = useState<string | null>(null);

  const Rename = (folderId: string) => {
    setRenameFolderId(folderId);  // Set folderId to trigger renaming
    setOnRename(true);  // Trigger renaming state
  };
  const Renamed = () => setOnRename(false); // Reset renaming state after completion

  const { mutate } = useMutationData(
    ["rename-folders"],
    (data: { name: string; id: string }) => renameFolders(data.id, data.name),
    "workspace-folders",
    Renamed
  );

  const { latestVariables } = useMutationDataState(["rename-folders"]);

  const folderName = useMemo(() => {
    return folders?.find((f) => f._id === folderId);
  }, [folderId, folders]);

  const handleFolderClick = (clickedFolderId: string) => {
    if (onRename) return; // If onRename is true, don't navigate
    const encodeFolderId = encodeId(clickedFolderId);
    navigate(`/folder/${encodeFolderId}`);
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>, id: string) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id }); // Call rename mutation
      } else {
        Renamed(); // If input is empty, cancel renaming
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        Renamed(); // Reset renaming state if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div ref={containerRef}>
      <BreadcrumbLine folderId={folderId} />
      <h2 className="text-xl font-semibold">{folderName?.name}</h2>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {folders
            .filter((f) => f._id !== folderId)
            .map((folder) => (
              <ContextMenu key={folder._id}>
                <ContextMenuTrigger
                  onClick={() => handleFolderClick(folder._id)}
                  className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                >
                  <FolderIcon className="text-yellow-500 mb-2" />
                  {onRename && renameFolderId === folder._id ? (
                    <Input
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        updateFolderName(e, folder._id);
                      }}
                      autoFocus
                      placeholder={folder.name}
                      className="border text-base w-full outline-none text-neutral-300  p-1 bg-gray-100"
                      ref={inputRef}
                    />
                  ) : (
                    <p className="text-neutral-300 cursor-pointer py-0">
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
                </ContextMenuTrigger>

                <ContextMenuContent className="w-[150px]">
                  <ContextMenuItem onClick={() => Rename(folder._id)}>Rename</ContextMenuItem>
                  <ContextMenuItem onClick={() => Rename(folder._id)}>Delete</ContextMenuItem>

                  {/* You can add more items here */}
                </ContextMenuContent>
              </ContextMenu>
            ))}
        </div>
      ) : (
        <div className="space-y-2">
          {folders
            .filter((f) => f._id !== folderId)
            .map((folder) => (
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
