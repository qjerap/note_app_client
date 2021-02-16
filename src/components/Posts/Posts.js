import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../Slices/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.posts.notes);
  const category = useSelector((state) => state.posts.filter.category);
  const search = useSelector((state) => state.posts.filter.search);

  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    //IF Search Bar is used, Display by text search
    if (search) {
      setFilteredNotes(
        notes.filter((note) => {
          return note.title.toUpperCase().search(search.toUpperCase()) != -1;
        })
      );
      // ELSE, display by categories
    } else {
      if (category === "all") setFilteredNotes(notes);
      else {
        setFilteredNotes(notes.filter((note) => note.category == category));
      }
    }
  }, [category, notes, search]);

  return (
    <div>
      {filteredNotes.map((note) => {
        return (
          <Post
            date={note.createdAt}
            title={note.title}
            description={note.description}
            id={note._id}
            key={note._id}
          />
        );
      })}
    </div>
  );
};

export default Posts;
