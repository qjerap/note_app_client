import React, { useEffect, useState } from "react";
import Post from "./Note/Note";
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
  }, []);

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
      if (filter.category === "all") {
        setFilteredNotes(notes);
      } else {
        setFilteredNotes(
          notes.filter((note) => note.category == filter.category)
        );
      }
    }
  }, [notes, filter]);

  return (
    <Center>
      {/* IF there is no notes to display*/}
      {notes.length <= 0 && (
        <Grid placeContent="center">
          <Heading
            margin={12}
            textAlign="center"
            fontSize="2xl"
            fontWeight="400"
            opacity={0.75}
          >
            Let's add our
            <strong> first note</strong>!
          </Heading>
          <Image src={emptySvg} m="auto" />
        </Grid>
      )}
      {notes.length > 0 &&
        (filteredNotes.length ? (
          <Grid
            templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}
            gap={[3, 4]}
            w="100%"
          >
            {filteredNotes
              //
              .slice()
              // SORT notes by date
              // .sort((a, b) => {
              //   return new Date(a.createdAt) - new Date(b.createdAt);
              // })
              .map((note) => {
                return (
                  <Post
                    key={note._id}
                    completed={note.completed}
                    creator={note.creator}
                    date={note.createdAt}
                    title={note.title}
                    description={note.description}
                    id={note._id}
                    category={note.category}
                  />
                );
              })}
          </Grid>
        ) : filter.search ? (
          /* IF there is no notes MATCHING with the search bar input*/
          <Grid placeContent="center">
            <Heading
              margin={12}
              textAlign="center"
              fontSize="2xl"
              fontWeight="400"
              opacity={0.75}
            >
              no notes match with «{" "}
              <Text display="inline" color={"green.300"} fontWeight="500">
                {filter.search.toUpperCase()}
              </Text>{" "}
              »
            </Heading>
            <Image src={searchSvg} m="auto" />
          </Grid>
        ) : (
          /* IF there is no notes IN A SPECIFIC CATEGORY*/
          <Grid placeContent="center">
            <Heading
              margin={12}
              textAlign="center"
              fontSize="2xl"
              fontWeight="400"
              opacity={0.75}
            >
              There is no note in the{" "}
              <Text
                fontWeight="500"
                color={
                  (filter.category === "home" && "teal.300") ||
                  (filter.category === "work" && "purple.300") ||
                  (filter.category === "personal" && "pink.300")
                }
                display="inline"
              >
                {filter.category.toUpperCase()}
              </Text>{" "}
              category yet...
            </Heading>
            <Image src={searchSvg} m="auto" />
          </Grid>
        ))}
    </Center>
  );
};

export default Posts;
