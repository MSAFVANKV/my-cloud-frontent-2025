import { IFiles } from "@/types/filesTypes";
import { IFolderTypes } from "@/types/folder-types";

import { createSlice } from "@reduxjs/toolkit";

type FormData = {
  folders: IFolderTypes[];
  files: IFiles[];
  isLoading: boolean;
  error: string | null;
};

const initialState: FormData = {
  folders: [],
  files: [],
  isLoading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFolderData: (state, action) => {
      state.folders = action.payload;
      state.isLoading = true;
    },
  },
});

export const { setFolderData } = folderSlice.actions;

export default folderSlice.reducer;
