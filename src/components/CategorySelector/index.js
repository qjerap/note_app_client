import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory, setFilterSearch } from "../../Slices/postsSlice";

const CategorySelector = () => {
  const notes = useSelector((state) => state.posts.notes);

  const dispatch = useDispatch();

  const setFilter = (e) => {
    dispatch(setFilterCategory(e.target.value));
    dispatch(setFilterSearch(""));
  };

  return (
    <div>
      <Box>
        <Button
          disabled={notes.length > 0 ? false : true}
          onClick={setFilter}
          value="all"
          fontSize={["sm", "md"]}
          mr={1}
        >
          All
        </Button>
        <Button
          disabled={notes.length > 0 ? false : true}
          onClick={setFilter}
          value="home"
          fontSize={["sm", "md"]}
          mr={1}
        >
          Home
        </Button>
        <Button
          disabled={notes.length > 0 ? false : true}
          onClick={setFilter}
          value="work"
          fontSize={["sm", "md"]}
          mr={1}
        >
          Work
        </Button>
        <Button
          disabled={notes.length > 0 ? false : true}
          onClick={setFilter}
          value="personal"
          fontSize={["sm", "md"]}
          mr={1}
        >
          Personal
        </Button>
      </Box>
    </div>
  );
};

export default CategorySelector;
