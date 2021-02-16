import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    edit: {
      currentId: "",
      isModalOpen: false,
    },
    filter: { category: "all", search: "" },
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
      state.notes = state.notes.filter(
        (note) => note._id != action.payload._id
      );
      state.notes.push(action.payload);

      // state.notes = state.notes.map((note) => {
      //   console.log(note._id, action.payload._id);
      //   if (note._id == action.payload._id) {
      //     return (note = action.paylaod);
      //   }
      // });
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
    // console.log(newNote, id);
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

export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
