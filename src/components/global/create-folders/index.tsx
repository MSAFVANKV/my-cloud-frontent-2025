import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/use-create-folder";

type Props = { name: string; parentId?: string };

const CreateFolders = ({ name, parentId }: Props) => {
  const { onCreateNewFolder } = useCreateFolders(name, parentId);
  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
    >
      <FolderPlusDuotine />
      Create A folder
    </Button>
  );
};

export default CreateFolders;
