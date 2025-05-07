import { useMainContext } from "@/providers/context/context";
import { Grid, List } from "lucide-react";
import { useParams } from "react-router-dom";


const GridView = () => {
    const { folderId } = useParams<{ folderId: string }>();

    const { setViewMode, viewMode } = useMainContext();

    const headerName = folderId &&folderId.replace(/-/g, " ");
  return (
    <div>
          <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl capitalize font-bold text-gray-800">
          {headerName ? headerName : "Home"}
  
        </h2>
        <div className="flex items-center">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded ${
              viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <Grid className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 ml-2 rounded ${
              viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <List className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GridView