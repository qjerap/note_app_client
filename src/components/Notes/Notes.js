import React, { useEffect, useState, Suspense } from "react";
import Post from "./Note/Note";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotesAsync } from "../../Slices/notesSlice";
import {
  Grid,
  Image,
  Center,
  Text,
  Heading,
  Fade,
  SlideFade,
} from "@chakra-ui/react";
import searchSvg from "../../assets/search-image.svg";
import emptySvg from "../../assets/add-note2.svg";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const filter = useSelector((state) => state.notes.filter);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    dispatch(fetchNotesAsync());
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

  function NotesTest() {
    const notesTest = notes;
    return notesTest.map((note) => <li key={note._id}>{note.title}</li>);
  }

  return (
    <Center>
      {/* IF there is no notes to display*/}
      {notes.length <= 0 && (
        <SlideFade offsetY="10px" in={true}>
        <Grid placeContent="center">
          <Heading
            height="100px"
            margin={12}
            textAlign="center"
            fontSize={["xl", "2xl"]}
            fontWeight="400"
            opacity={0.75}
          >
            Let's add our
            <strong> first note</strong>!
          </Heading>
          <Image src={emptySvg} m="auto" w={["100%", "60%"]} />
        </Grid>
        </SlideFade>
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
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
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
          <SlideFade offsetY="10px" in={true}>
            <Grid placeContent="center">
              <Heading
                height="100px"
                margin={12}
                textAlign="center"
                fontSize={["md", "2xl"]}
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
          </SlideFade>
        ) : (
          /* IF there is no notes IN A SPECIFIC CATEGORY*/
          <SlideFade offsetY="10px" in={true}>
            <Grid placeContent="center">
              <Heading
                height="100px"
                margin={12}
                textAlign="center"
                fontSize={["md", "2xl"]}
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
          </SlideFade>
        ))}
    </Center>
  );
};

export default Notes;
