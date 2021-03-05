import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../Slices/postsSlice";
import { Grid, Image, Center, Text, Heading } from "@chakra-ui/react";
import searchSvg from "../../assets/search-image.svg";
import emptySvg from "../../assets/add-note.svg";

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
    <Center>
      {/* IF there is no notes IN A CATEGORY*/}
      {notes.length <= 0 && (
        <Grid placeContent="center">
          <Heading
            margin={12}
            textAlign="center"
            fontSize="2xl"
            fontWeight="400"
            opacity={0.75}
          >
            <strong>Let's add our first note!</strong>
          </Heading>
          <Image src={emptySvg} m="auto" />
        </Grid>
      )}
      {notes.length > 0 &&
        (filteredNotes.length ? (
          <Grid
            templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}
            gap={[3, 6]}
            w="100%"
          >
            {filteredNotes.map((note) => {
              return (
                <Post
                  key={note._id}
                  completed={note.completed}
                  creator={note.creator}
                  date={note.createdAt}
                  title={note.title}
                  description={note.description}
                  id={note._id}
                />
              );
            })}
          </Grid>
        ) : filter.search ? (
          <Grid placeContent="center">
            <Heading
              margin={12}
              textAlign="center"
              fontSize="2xl"
              fontWeight="400"
              opacity={0.75}
            >
              no notes match with «{" "}
              <strong>{filter.search.toUpperCase()}</strong> »
            </Heading>
            <Image src={searchSvg} m="auto" />
          </Grid>
        ) : (
          <Grid placeContent="center">
            <Heading
              margin={12}
              textAlign="center"
              fontSize="2xl"
              fontWeight="400"
              opacity={0.75}
            >
              There is no note in the{" "}
              <strong>{filter.category.toUpperCase()}</strong> category yet...
            </Heading>
            <Image src={searchSvg} m="auto" />
          </Grid>
        ))}
    </Center>
  );
};

export default Posts;
