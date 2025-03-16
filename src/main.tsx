import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import rootRouter from "./routes/Root-Router.tsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import ReactQueryProvider from "./providers/react-query/index.tsx";
import { Toaster2 } from "./components/ui/toaster.tsx";
import { ContextProvider } from "./providers/context/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
    <ReactQueryProvider>
      <Provider store={store}>
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 2000,
          }}
          containerStyle={{
            zIndex: "100009",
          }}
          gutter={14}
        />
           <Toaster2 />
        <RouterProvider router={rootRouter} />
      </Provider>
    </ReactQueryProvider>
    </ContextProvider>
  </StrictMode>
);
