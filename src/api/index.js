const url = "http://localhost:5000/posts";

export const fetchPost = async () => {
  let data = await fetch(url);
  let notes = await data.json();
  return notes;
};

export const createPost = async (newNote) => {
  const note = await fetch("http://localhost:5000/posts", {
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
  const update = await fetch(`http://localhost:5000/posts/${id}`, {
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
  const deleteNote = await fetch(`http://localhost:5000/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  
  const res = await deleteNote.json();
  return res;
};

