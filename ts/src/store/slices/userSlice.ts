import { createSlice } from "@reduxjs/toolkit";
import { clearToken, setToken } from "@modules/token";
import { User } from "#types/index";

const initialState: User = {
  _id: "",
  email: "",
  name: "",
  phone: "",
  address: "",
  type: "user",
  profileImage: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: { value: initialState },
  reducers: {
    login: (state, action) => {
      const { _id, email, name, phone, address, type, profileImage, token } =
        action.payload;
      const { accessToken, refreshToken } = token;

      setToken(accessToken, refreshToken);
      state.value = { _id, email, name, phone, address, type, profileImage };
      alert(`로그인 되었습니다.`);
    },
    logout: (state) => {
      state.value = initialState;
      clearToken();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
