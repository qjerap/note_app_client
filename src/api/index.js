import axios from "axios";

//  "https://notes-qp.herokuapp.com";
const API = axios.create({ baseURL: "http://localhost:5000" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req
});

export const fetchPost = () => API.get('/posts');
export const createPost = (newNote) => API.post('/posts', newNote);
export const updatePost = (updatedPost, id) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
