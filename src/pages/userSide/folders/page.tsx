import { getFoldersWithSub } from "@/actions/create_Folder/FilesAction";
import AllFiles from "@/components/global/files";
import Folders from "@/components/global/folders";
import Loader from "@/components/global/loader";
import { useQueryData } from "@/hooks/useQueryData";
import { dispatch } from "@/providers/redux/hook";
import { setFolderData } from "@/providers/redux/reducers/folder_Slice";
import { IFolderTypes } from "@/types/folder-types";
import { decodeId } from "@/utils/encorder";
import { useLocation, useParams } from "react-router-dom";

type Props = {
  showAll?: boolean;
};

const FolderPage = ({ showAll }: Props) => {
  const { folderId } = useParams<{ folderId: string }>();
  const decodedFolderId = !showAll && folderId ? decodeId(folderId) : "";

  const { pathname } = useLocation();

  const {
    data: fetchedData,
    isFetching,
    isFetched,
  } = useQueryData(["workspace-folders", folderId], () =>
    getFoldersWithSub(
      !showAll && pathname !== "/"
        ? [{ key: "parentId", value: decodedFolderId }]
        : [{ key: "", value: "" }]
    )
  );

  const { data: folders } = (fetchedData ?? {}) as {
    status?: number;
    data?: IFolderTypes[];
  };

  if (isFetched && folders) {
    dispatch(setFolderData({ folders: folders }));
  }

  if (isFetching)
    return (
      <div className="flex justify-center items-center bg-black/10  h-full w-full">
        <Loader state={true} />
      </div>
    );

  if (!folders || folders?.length === 0) {
    return (
      <div className="space-y-3  h-full  py-3 overflow-y-scroll">
        <AllFiles />
      </div>
    );
  }

  return (
    <div className="space-y-3  h-full  py-3 overflow-y-scroll">
      <Folders folders={folders} showAll={showAll} folderId={decodedFolderId} />
      <AllFiles />
    </div>
  );
};

export default FolderPage;
