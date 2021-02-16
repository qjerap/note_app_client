import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setFilterCategory, setFilterSearch } from "../../Slices/postsSlice";

const CategorySelector = () => {
  const dispatch = useDispatch();

  const setFilter = (e) => {
    dispatch(setFilterCategory(e.target.value));
    dispatch(setFilterSearch(""))
  };

  return (
    <div>
      <Box>
        <Button onClick={setFilter} value="all">
          All
        </Button>
        <Button onClick={setFilter} value="home">
          Home
        </Button>
        <Button onClick={setFilter} value="work">
          Work
        </Button>
        <Button onClick={setFilter} value="personal">
          Personal
        </Button>
      </Box>
    </div>
  );
};

export default CategorySelector;
