import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSearch, setFilterCategory } from "../../Slices/postsSlice";

const Search = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(setFilterSearch(searchInput));
    dispatch(setFilterCategory("all"));
  }, [searchInput]);

  return (
    <Input
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
      placeholder="Search notes..."
    />
  );
};

export default Search;
