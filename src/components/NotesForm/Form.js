import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Heading,
  Input,
  Textarea,
  Select,
  useToast,
  Box,
  Grid,
  Flex,
  ModalCloseButton,
} from "@chakra-ui/react";
import { createNoteAsync, updateNoteAsync } from "../../Slices/notesSlice";

const Form = (props) => {
  // Get Id of the note to be edited
  const edit = useSelector((state) => state.notes.edit);
  // get notes from the state
  const notes = useSelector((state) => state.notes.notes);
  // filter the right note
  const noteToUpdate = notes.filter((note) => note._id === edit.currentId);

  useEffect(() => {
    if (edit.currentId) {
      setNoteData(noteToUpdate[0]);
    }
  }, [edit.currentId]);

  const toast = useToast();

  const dispatch = useDispatch();
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    category: "",
    completed: false,
  });

  const handleChange = (e) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit.currentId) {
      dispatch(updateNoteAsync(noteData, edit.currentId));
    } else {
      dispatch(createNoteAsync(noteData));
    }
    setNoteData({
      title: "",
      description: "",
      category: "",
      completed: false,
    });
    props.onClose();
    toast({
      title: "Note added.",
      description: "Note has been sucesfully added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading
        p={(1, 5)}
        size="md"
        fontWeight="500"
        opacity={0.75}
        borderBottom="2px"
        borderColor="gray.100"
        mb={5}
      >
        {edit.currentId ? "Edit note" : "Add note"}
      </Heading>

      <form action="/" method="/POST" onSubmit={handleSubmit}>
        <Grid
          gridTemplateColumns={["1fr"]}
          p={(1, 5)}
          gridGap={5}
        >
          {/*       <Input
        type="text"
        value={noteData.creator}
        name="creator"
        placeholder="Creator"
        onChange={handleChange}
      />*/}
          <Input
            type="text"
            value={noteData.title}
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required={true}
          />{" "}
          <Select
            value={noteData.category}
            name="category"
            onChange={handleChange}
            placeholder="Select Category"
            required={true}
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </Select>
          <Textarea
            resize="none"
            rows={5}
            maxLength={175}
            value={noteData.description}
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required={true}
          ></Textarea>
        </Grid>

        <Flex justifyContent="flex-end" paddingRight={(1, 5)} paddingBottom={5}>
          <ModalCloseButton top="1rem" />
          <Button type="submit">{edit.currentId ? "UPDATE" : "ADD"}</Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Form;
