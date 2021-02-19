import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setFilterCategory, setFilterSearch } from "../../Slices/postsSlice";

const CategorySelector = () => {
  const dispatch = useDispatch();

  const setFilter = (e) => {
    dispatch(setFilterCategory(e.target.value));
    dispatch(setFilterSearch(""));
  };

  return (
    <div>
      <Box>
        <Button onClick={setFilter} value="all" fontSize={["sm", "md"]} mr={1}>
          All
        </Button>
        <Button onClick={setFilter} value="home" fontSize={["sm", "md"]} mr={1}>
          Home
        </Button>
        <Button onClick={setFilter} value="work" fontSize={["sm", "md"]} mr={1}>
          Work
        </Button>
        <Button
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
