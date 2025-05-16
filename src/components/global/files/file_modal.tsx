import { useState } from "react";
import Modal from "../modal-launcher";
import { IFiles } from "@/types/filesTypes";
import ImageComponent from "@/components/global/image";
import { RotateCw, RotateCcw } from "lucide-react";

type Props = {
  file: IFiles;
  viewMode?: "list" | "grid";
};

const FileModal = ({ file, viewMode }: Props) => {
  const [rotation, setRotation] = useState(0);

  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleRotateCounterclockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  return (
    <div>
      <Modal
        title="Selected Image"
        trigger={
          <ImageComponent
            src={file.src}
            alt={file.name}
            disableLink
            className={`cursor-pointer flex ${
              viewMode === "list" ? "w-14 h-14" : "w-full h-36 "
            } items-center justify-center overflow-hidden`}
            classNameImg="object-cover w-full h-full rounded-md"
          />
        }
        className="w-full max-w-full h-full rounded-none flex flex-col p-5"
      >
        {/* Button Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleRotateCounterclockwise}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={handleRotateClockwise}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Image Wrapper */}
        {/* <div className="h-[calc(100vh - 100px)] w-full flex items-center justify-center">
          <img
            src={file.src}
            alt=""
            className="object-contain w-full h-full transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div> */}

        <ImageComponent
          src={file.src}
          alt={file.name}
          disableLink
          className="cursor-pointer flex items-center justify-center overflow-hidden w-full h-[calc(100vh-100px)]"
          classNameImg="transition-transform duration-300"
          style={{
            transform: `rotate(${rotation}deg)`,
            maxWidth: rotation % 180 === 0 ? "100%" : "calc(100vh - 100px)",
            maxHeight: rotation % 180 === 0 ? "calc(100vh - 100px)" : "100%",
            objectFit: "contain",
          }}
        />
      </Modal>
    </div>
  );
};

export default FileModal;
