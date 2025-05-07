import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import folderReducer from "./reducers/folder_Slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    folders: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
