import { FolderPlus } from "lucide-react";
import AyButton from "../myUi/AyButton";
import Modal from "../global/modal-launcher";
import CreateFolders from "../global/create-folders";
import { Input } from "../ui/input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { decodeId } from "@/utils/encorder";

const UploadFolders = () => {
  const [folderName, setFolderName] = useState("Unknown-name");

  const { folderId } = useParams<{ folderId: string }>();

  const decodedFolderId = folderId ? decodeId(folderId) : "";


  return (
    <div>
      <Modal
        trigger={
          <AyButton
            title=""
            variant="outlined"
            outLineColor="black"
            sx={{
              // bgcolor:"#155dfc"
              width: "100%",
              borderRadius: "10px",
              height: "40px",
            }}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </AyButton>
        }
        title="Upload Your Files"
      >
        <div className="flex flex-col">
          <Input
            name="name"
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
          />
        </div>

        <CreateFolders name={folderName} parentId={decodedFolderId ?? ""} />
      </Modal>
    </div>
  );
};

export default UploadFolders;
