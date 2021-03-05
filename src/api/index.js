// const url = "https://notes-qp.herokuapp.com";
const url = "http://localhost:5000";

export const fetchPost = async () => {
  let data = await fetch(`${url}/posts`);
  let notes = await data.json();
  return notes;
};

export const createPost = async (newNote) => {
  const note = await fetch(`${url}/posts`, {
    method: "POST",
    body: JSON.stringify({
      newNote,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const res = await note.json();
  return res;
};

export const updatePost = async (updatedPost, id) => {
  console.log(id);
  const update = await fetch(`${url}/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      updatedPost,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const res = await update.json();
  return res;
};

export const deletePost = async (id) => {
  const deleteNote = await fetch(`${url}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const res = await deleteNote.json();
  return res;
};

export const signIn = async (formData) => {
  const user = await fetch(`${url}/user/signin`, {
    method: "POST",
    body: JSON.stringify({
      formData,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const res = await user.json();
  return res;
};
export const signUp = async (formData) => {
  const user = await fetch(`${url}/user/signup`, {
    method: "POST",
    body: JSON.stringify({
      formData,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const res = await user.json();
  console.log(res)
  return res;
};
