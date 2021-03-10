import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: {},
    token: "",
  },
  reducers: {
    signIn: (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("profile", JSON.stringify(action.payload));
        state.profile = action.payload.result;
        state.token = action.payload.token;
      } else {
      }
    },
    signUp: (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("profile", JSON.stringify(action?.payload));
        state.profile = action.payload.result;
        state.token = action.payload.token;
      } else {
      }
    },

    logOut: (state, action) => {
      localStorage.clear("profile");
      state.profile = {};
      state.token = "";
    },
  },
});

export const { signIn, signUp, logOut } = authSlice.actions;

export const signInAsync = (formData) => (dispatch) => {
  (async () => {
    console.log(formData)
    try {
      const { data } = await api.signIn(formData);
      dispatch(signIn(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  })();
};
export const signUpAsync = (formData) => (dispatch) => {
  (async () => {
    try {
      const { data } = await api.signUp(formData);
      dispatch(signIn(data));
    } catch (error) {
      console.log(error);
    }
  })();
};

export default authSlice.reducer;
