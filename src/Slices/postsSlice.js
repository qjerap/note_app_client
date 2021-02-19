import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    edit: {
      currentId: "",
      isModalOpen: false,
    },
    filter: { category: "all", search: null },
    notes: [],
  },
  reducers: {
    fetchPosts: (state, action) => {
      state.notes = action.payload;
    },
    createPost: (state, action) => {
      state.notes.push(action.payload);
    },
    deletePost: (state, action) => {
      state.notes = state.notes.filter((note) => note._id != action.payload);
    },
    updatePost: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload._id ? (note = action.payload) : note
      );
    },
    setCompleted: (state, action) => {
      state.notes.map(
        (note) =>
          note._id === action.payload.id &&
          (note.completed = action.payload.note.completed)
      );
    },
    setCurrentId: (state, action) => {
      state.edit.currentId = action.payload;
      state.edit.isModalOpen = true;
    },
    setFilterCategory: (state, action) => {
      state.filter.category = action.payload;
    },
    setFilterSearch: (state, action) => {
      state.filter.search = action.payload;
    },
  },
});

export const {
  fetchPosts,
  createPost,
  deletePost,
  updatePost,
  setCurrentId,
  setFilterCategory,
  setFilterSearch,
  setCompleted,
} = postsSlice.actions;

export const fetchPostsAsync = () => (dispatch) => {
  (async () => {
    const data = await api.fetchPost();
    dispatch(fetchPosts(data));
  })();
};
export const createPostAsync = (newNote) => (dispatch) => {
  (async () => {
    const data = await api.createPost(newNote);
    dispatch(createPost(data));
  })();
};
export const updatePostAsync = (newNote, id) => (dispatch) => {
  (async () => {
    const data = await api.updatePost(newNote, id);
    dispatch(updatePost(newNote));
  })();
};
export const deletePostAsync = (id) => (dispatch) => {
  (async () => {
    const data = await api.deletePost(id);
    dispatch(deletePost(id));
  })();
};
export const setCompletedAsync = (id, note) => (dispatch) => {
  (async () => {
    const data = await api.updatePost(note, id);
    dispatch(setCompleted({ id, note }));
  })();
};

export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
