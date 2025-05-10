import { IFiles } from "@/types/filesTypes";
import { IFolderTypes } from "@/types/folder-types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  folders: IFolderTypes[];
  files: IFiles[];
  isLoading: boolean;
  error: string | null;
};

const initialState: initialStateProps = {
  folders: [],
  files: [],
  isLoading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolderData: (state, action) => {
      state.folders = action.payload;
      state.isLoading = true;
    },
    FOLDERS: (_state, action: PayloadAction<initialStateProps>) => {
      return { ...action.payload }
    },
  },
});

export const { setFolderData , FOLDERS} = folderSlice.actions;

export default folderSlice.reducer;
