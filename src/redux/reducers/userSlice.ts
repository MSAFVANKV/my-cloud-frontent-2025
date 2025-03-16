import { IUser } from "@/types/userTpes";
import { createSlice } from "@reduxjs/toolkit";

type FormData = {
  user: IUser[];
  currentUser: IUser | null;
  selectedUser: IUser | null;
  token: string | null;
  isLoading: boolean;
  isLogged: boolean;
  error: string | null;
};

const initialState: FormData = {
  user: [],
  currentUser: null,
  selectedUser: null,
  token: null,
  isLoading: false,
  isLogged: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = [];
      state.token = null;
      state.isLogged = false;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },

    setCurrentUserData: (state, action) => {
      state.currentUser = action.payload;
      state.isLogged = true;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    resetChatSelectUser: (state) => {
      state.selectedUser = null;
    },
  },
});

export const {
  logoutState,
  setUserData,
  setCurrentUserData,
  setSelectedUser,
  resetChatSelectUser,
} = userSlice.actions;

export default userSlice.reducer;
