import AllFiles from "@/components/global/files";
import Folders from "@/components/global/folders";

const FolderPage = () => {
  return (
    <div className="space-y-3  h-full overflow-y-scroll">
      <Folders  />
      <AllFiles />
    </div>
  );
};

export default FolderPage;
