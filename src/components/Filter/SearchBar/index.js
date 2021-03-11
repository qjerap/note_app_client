import React from "react";
import { Input, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSearch, setFilterCategory } from "../../../Slices/notesSlice";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";

const Search = () => {
  const dispatch = useDispatch();
  const stateBar = useSelector((state) => state.notes.filter.search);
  const notes = useSelector((state) => state.notes.notes);
  const user = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    dispatch(setFilterCategory("all"));
    dispatch(setFilterSearch(e.target.value));
  };

  return (
    <Box position="relative">
      <SearchIcon
        position="absolute"
        left="2%"
        top="50%"
        transform="translateY(-50%)"
        opacity={stateBar ? 0 : 0.5}
        transition="all 0.3s"
      />
      <Input
        disabled={notes.length > 0 && user.length > 0 ? false : true}
        pl={stateBar ? 5 : 12}
        pr={10}
        onInput={handleChange}
        value={stateBar}
        placeholder="Search notes..."
        borderRadius="sm"
        _focus={{boxShadow:"none"}}
      />
      <Box
        zIndex="9"
        cursor="pointer"
        borderRadius="50%"
        opacity={stateBar ? 0.5 : 0}
        visibility={stateBar ? "visible" : "hidden"}
        position="absolute"
        right="2%"
        top="50%"
        transform="translateY(-50%)"
        transition="all 0.3s"
        onClick={() => {
          dispatch(setFilterSearch(""));
        }}
      >
        <SmallCloseIcon fontSize="2xl" />
      </Box>
    </Box>
  );
};

export default Search;
