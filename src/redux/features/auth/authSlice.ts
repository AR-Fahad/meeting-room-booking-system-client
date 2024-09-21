import { TUser } from "@/interfaces/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: null | TUser;
  token: "" | string;
};

const initialState: TAuthState = {
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TAuthState>) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice;

// export const selectCurrentAuth = (state: RootState) => state.auth;
