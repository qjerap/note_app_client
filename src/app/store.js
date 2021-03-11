import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../Slices/notesSlice";
import authReducer from "../Slices/authSlice";

export default configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
  },
});
