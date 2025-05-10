import { useMainContext } from "@/providers/context/context";
import { Clock, CloudRain, File, FolderPlus, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadFiles from "../uploads/upload-files";
import UploadFolders from "../uploads/upload-folders";

const SideBar = () => {
  const { menuOpen } = useMainContext();
  const navigate = useNavigate()
  const { pathname} = useLocation()


  const sideBarItems = [
    {
      id:1,
      title:"Home",
      icon:<FolderPlus className="h-5 w-5 mr-3" />,
      url:"/"
    },
    {
      id:2,
      title:"Folders",
      icon:<Star className="h-5 w-5 mr-3" />,
      url:"/folder/all"
    },
    {
      id:2,
      title:"Starred",
      icon:<Star className="h-5 w-5 mr-3" />,
      url:"/starred"
    },
    {
      id:3,
      title:"Recent",
      icon:<Clock className="h-5 w-5 mr-3" />,
      url:"/recent"
    },
    {
      id:4,
      title:"Shared With Me",
      icon:<File className="h-5 w-5 mr-3" />,
      url:"share-with"
    },
    {
      id:5,
      title:"Trash",
      icon:<File className="h-5 w-5 mr-3" />,
      url:"trash"
    }
  ]


  const redirectPage = (url:string)=>{
    navigate(`${url}`)
  }

  return (
    <aside
      className={`bg-white w-64 border-r border-gray-200 flex-shrink-0 ${
        menuOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="p-4 flex flex-col gap-3">
        {/* upload files here */}
        <UploadFiles />
      
      <UploadFolders />
        {/* === folder button === */}
     
      </div>

      <nav className="mt-2">
        <ul>
          {sideBarItems.map(
            (item, index) => (
              <li key={index}>
                <button
                  onClick={() => redirectPage(item.url)}
                  className={`flex items-center w-full cursor-pointer px-4 py-2 text-left ${
                    pathname === item.url
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon} {item.title}
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
