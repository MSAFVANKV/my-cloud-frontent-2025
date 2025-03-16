import { useMainContext } from "@/providers/context/context";
import { Clock, CloudRain, File, FolderPlus, Star, Upload } from "lucide-react";
import { useState } from "react";
import AyButton from "../myUi/AyButton";

const SideBar = () => {
  const { menuOpen } = useMainContext();
  const [currentFolder, setCurrentFolder] = useState("Home");

  return (
    <aside
      className={`bg-white w-64 border-r border-gray-200 flex-shrink-0 ${
        menuOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="p-4 flex flex-col gap-3">
        <AyButton
          title=""
          sx={{
            // bgcolor:"#155dfc"
            width: "100%",
            borderRadius:"10px",
            height:"40px"
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </AyButton>
        <AyButton
          title=""
          variant="outlined"
          outLineColor="black"
          sx={{
            // bgcolor:"#155dfc"
            width: "100%",
            borderRadius:"10px",
            height:"40px"
          }}
        >
         <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </AyButton>
        {/* === folder button === */}
     
      </div>

      <nav className="mt-2">
        <ul>
          {["Home", "Starred", "Recent", "Shared with me", "Trash"].map(
            (item, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentFolder(item)}
                  className={`flex items-center w-full px-4 py-2 text-left ${
                    currentFolder === item
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item === "Home" && <FolderPlus className="h-5 w-5 mr-3" />}
                  {item === "Starred" && <Star className="h-5 w-5 mr-3" />}
                  {item === "Recent" && <Clock className="h-5 w-5 mr-3" />}
                  {item === "Shared with me" && (
                    <File className="h-5 w-5 mr-3" />
                  )}
                  {item === "Trash" && <File className="h-5 w-5 mr-3" />}
                  {item}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      <div className="p-4 mt-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center">
            <CloudRain className="text-blue-500 h-5 w-5" />
            <h3 className="ml-2 font-medium text-blue-700">Storage</h3>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">4.5 GB of 10 GB used</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
