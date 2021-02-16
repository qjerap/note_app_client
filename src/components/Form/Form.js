import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Textarea, Select, useToast } from "@chakra-ui/react";
import { createPostAsync, updatePostAsync } from "../../Slices/postsSlice";

const Form = () => {
  // Get Id of the note to be edited
  const edit = useSelector((state) => state.posts.edit);
  // get notes from the state
  const notes = useSelector((state) => state.posts.notes);
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
    creator: "",
    title: "",
    description: "",
    category: "",
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
      dispatch(updatePostAsync(noteData, edit.currentId));
    } else {
      dispatch(createPostAsync(noteData));
    }
    setNoteData({ creator: "", title: "", description: "", category: "" });
  };

  return (
    <div>
      <h1>{edit.currentId ? "edit" : "create"}</h1>
      <form action="/" method="/POST" onSubmit={handleSubmit}>
        <Input
          type="text"
          value={noteData.creator}
          name="creator"
          placeholder="Creator"
          onChange={handleChange}
        />
        <Input
          type="text"
          value={noteData.title}
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <Textarea
          value={noteData.description}
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></Textarea>
        <Select
          value={noteData.category}
          name="category"
          onChange={handleChange}
        >
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Select>
        <Button
          onClick={() =>
            toast({
              title: "Note added.",
              description: "Note has been sucesfully added",
              status: "success",
              duration: 2000,
              isClosable: true,
            })
          }
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
