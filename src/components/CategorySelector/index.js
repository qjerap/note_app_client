import React from "react";
import { Button, Box, ButtonGroup } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory, setFilterSearch } from "../../Slices/postsSlice";

const CategorySelector = () => {
  const notes = useSelector((state) => state.posts.notes);
  const user = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const setFilter = (e) => {
    dispatch(setFilterCategory(e.target.value));
    dispatch(setFilterSearch(""));
  };

  return (
    <div>
      <ButtonGroup isAttached>
        <Button
          disabled={notes.length > 0 && user.length > 0 ? false : true}
          onClick={setFilter}
          value="all"
          fontSize={["sm", "md"]}
        >
          All
        </Button>
        <Button
          disabled={notes.length > 0 && user.length > 0 ? false : true}
          onClick={setFilter}
          value="home"
          fontSize={["sm", "md"]}
        >
          Home
        </Button>
        <Button
          disabled={notes.length > 0 && user.length > 0 ? false : true}
          onClick={setFilter}
          value="work"
          fontSize={["sm", "md"]}
        >
          Work
        </Button>
        <Button
          disabled={notes.length > 0 && user.length > 0 ? false : true}
          onClick={setFilter}
          value="personal"
          fontSize={["sm", "md"]}
        >
          Personal
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CategorySelector;
