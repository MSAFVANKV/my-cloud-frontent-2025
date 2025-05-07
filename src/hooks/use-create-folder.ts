import { createFolder } from "@/actions/create_Folder/FilesAction";
import { useMutationData } from "./useMutationData";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateFolders = (name: string, parentId?: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(name, parentId),
    "workspace-folders",
    (data) => {
      if (data.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["workspace-folders"] });
        queryClient.invalidateQueries({ queryKey: ["all-files"] });
      }
    }
  );

  const onCreateNewFolder = () =>
    mutate({ name: "Untitled", id: "optimitsitc--id" });
  return { onCreateNewFolder };
};
