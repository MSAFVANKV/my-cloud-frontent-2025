import App from "@/App";
import ProtectedRoute from "@/middlewares/ProtectedRoute";
import HomePage from "@/pages/userSide/Home/home-page";
import { createBrowserRouter } from "react-router-dom";


const rootRouter = createBrowserRouter(
    [
        {
            path: "/",
            element:
            <ProtectedRoute>

                <App />
            </ProtectedRoute>
            ,

            children:[
                {
                    path: "/",
                    element:<HomePage />,
                   
                }
            ]
            
        }
    ]
)

export default rootRouter;