import axios from "axios";

//  "https://notes-qp.herokuapp.com";
const API = axios.create({ baseURL: "https://notes-qp.herokuapp.com/" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req
});

export const fetchNote = () => API.get('/notes');
export const createNote = (newNote) => API.post('/notes', newNote);
export const updateNote = (updatedPost, id) => API.patch(`/notes/${id}`, updatedPost);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
