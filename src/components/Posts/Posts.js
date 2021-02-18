import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../Slices/postsSlice";
import { Grid, GridItem, Center } from "@chakra-ui/react";

const Posts = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.posts.notes);
  const filter = useSelector((state) => state.posts.filter);

  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    //IF Search Bar is used, Display by text search
    if (filter.search) {
      setFilteredNotes(
        notes.filter((note) => {
          return (
            note.title.toUpperCase().search(filter.search.toUpperCase()) != -1
          );
        })
      );
      // ELSE, display by categories
    } else {
      if (filter.category === "all") setFilteredNotes(notes);
      else {
        setFilteredNotes(
          notes.filter((note) => note.category == filter.category)
        );
      }
    }
  }, [notes, filter]);

  return (
    <Grid
      templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}
      gap={[3, 6]}
      w="100%"
    >
      {filteredNotes.map((note) => {
        return (
          <Center>
            <Post
              date={note.createdAt}
              title={note.title}
              description={note.description}
              id={note._id}
              key={note._id}
            />
          </Center>
        );
      })}
    </Grid>
  );
};

export default Posts;
