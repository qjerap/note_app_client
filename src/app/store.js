import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../Slices/postsSlice";
import authReducer from "../Slices/authSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
