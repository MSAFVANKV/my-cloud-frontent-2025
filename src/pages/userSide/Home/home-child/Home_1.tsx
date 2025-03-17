import { useState } from "react";
import {
  FolderPlus,
  File,
  Image,
  Video,
  FileText,

  Star,

} from "lucide-react";
import { useMainContext } from "@/providers/context/context";
import FolderPage from "../../folders/page";
// import { useParams } from "react-router-dom";

export default function Home1() {
  // State for current folder structure

  const {  viewMode } = useMainContext();

  // Sample folders and files data
  const [items, setItems] = useState([
    {
      id: 1,
      type: "folder",
      name: "Documents",
      starred: false,
      date: "Feb 24, 2025",
    },
    {
      id: 2,
      type: "folder",
      name: "Photos",
      starred: true,
      date: "Feb 20, 2025",
    },
    {
      id: 3,
      type: "folder",
      name: "Videos",
      starred: false,
      date: "Feb 15, 2025",
    },
    {
      id: 4,
      type: "image",
      name: "vacation.jpg",
      starred: false,
      date: "Feb 10, 2025",
    },
    {
      id: 5,
      type: "document",
      name: "project_notes.txt",
      starred: true,
      date: "Feb 5, 2025",
    },
    {
      id: 6,
      type: "video",
      name: "presentation.mp4",
      starred: false,
      date: "Jan 28, 2025",
    },
  ]);

  // Function to toggle star status
  const toggleStar = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };

  // Function to render appropriate icon based on item type
  const renderIcon = (type: string) => {
    switch (type) {
      case "folder":
        return (
          <div className="bg-blue-100 p-2 rounded-lg up">
            <FolderPlus className="text-blue-500" />
          </div>
        );
      case "image":
        return (
          <div className="bg-green-100 p-2 rounded-lg">
            <Image className="text-green-500" />
          </div>
        );
      case "video":
        return (
          <div className="bg-purple-100 p-2 rounded-lg">
            <Video className="text-purple-500" />
          </div>
        );
      case "document":
        return (
          <div className="bg-amber-100 p-2 rounded-lg">
            <FileText className="text-amber-500" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-lg">
            <File className="text-gray-500" />
          </div>
        );
    }
  };

  // Animation className for items
  const itemAnimation =
    "transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1";

  return (
    <main className="flex-1 overflow-auto">
   

      {/* Files and folders grid/list */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${itemAnimation}`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {renderIcon(item.type)}
                  <button
                    onClick={() => toggleStar(item.id)}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        item.starred ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-medium text-gray-800 mt-3 truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Starred
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderIcon(item.type)}
                      <span className="ml-3 font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => toggleStar(item.id)}
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          item.starred ? "fill-yellow-400 text-yellow-400" : ""
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* uploaded files */}
      <div className="">
        <FolderPage />
      </div>
    </main>
  );
}
