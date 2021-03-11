import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    edit: {
      currentId: "",
      isModalOpen: false,
    },
    filter: { category: "all", search: null },
    notes: [],
  },
  reducers: {
    fetchNotes: (state, action) => {
      state.notes = action.payload;
    },
    createNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id != action.payload);
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload._id ? (note = action.payload) : note
      );
      state.edit.currentId = "";
    },
    setCompleted: (state, action) => {
      console.log(action)
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
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
  setCurrentId,
  setFilterCategory,
  setFilterSearch,
  setCompleted,
} = notesSlice.actions;

export const fetchNotesAsync = () => (dispatch) => {
  (async () => {
    const { data } = await api.fetchNote();
    dispatch(fetchNotes(data));
  })();
};
export const createNoteAsync = (newNote) => (dispatch) => {
  (async () => {
    const { data } = await api.createNote(newNote);
    dispatch(createNote(data));
  })();
};
export const updateNoteAsync = (newNote, id) => (dispatch) => {
  (async () => {
    const { data } = await api.updateNote(newNote, id);
    dispatch(updateNote(data));
  })();
};
export const deleteNoteAsync = (id) => (dispatch) => {
  (async () => {
    const { data } = await api.deleteNote(id);
    dispatch(deleteNote(data));
  })();
};
export const setCompletedAsync = (id, note) => (dispatch) => {
  (async () => {
    console.log(id, note)
    const { data } = await api.updateNote(note, id);
    dispatch(setCompleted({id, note}));
  })();
};

export default notesSlice.reducer;
