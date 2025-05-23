import App from "@/App";
import ProtectedRoute from "@/middlewares/ProtectedRoute";
import FolderPage from "@/pages/userSide/folders/page";
import HomePage from "@/pages/userSide/Home/home-page";
import StarredPage from "@/pages/userSide/starred/page";
import { createBrowserRouter } from "react-router-dom";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/folder/:folderId",
        element: <FolderPage />,
      },
      {
        path: "/folder/all",
        element: <FolderPage showAll />,
      },
      {
        path: "/starred",
        element: <StarredPage />,
      },
    ],
  },
]);

export default rootRouter;
