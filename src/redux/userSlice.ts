import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    email: string;
    _id: string;
  };
  accessToken: string;
}

const initialState: UserState = {
  user: {
    email: "",
    _id: "",
  },
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { user, accessToken } = action.payload;
      state.user._id = user._id;

      state.user.email = user.email;
      state.accessToken = accessToken;
    },
    clearUser: (state) => {
      state.user._id = "";
      state.accessToken = "";
      state.user.email = "";
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, clearUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
