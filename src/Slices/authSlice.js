import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: {},
    token: "",
    error: "",
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

    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { signIn, signUp, logOut, authError } = authSlice.actions;

export const signInAsync = (formData) => (dispatch) => {
  (async () => {
    try {
      const { data } = await api.signIn(formData);
      dispatch(signIn(data));
    } catch (error) {
      dispatch(authError(error.response.data.message));
    }
  })();
};
export const signUpAsync = (formData) => (dispatch) => {
  (async () => {
    try {
      const { data } = await api.signUp(formData);
      dispatch(signIn(data));
    } catch (error) {
      dispatch(authError(error.response.data.message));
    }
  })();
};

export default authSlice.reducer;
