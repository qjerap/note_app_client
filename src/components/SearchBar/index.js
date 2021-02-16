import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSearch, setFilterCategory } from "../../Slices/postsSlice";

const Search = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const stateBar = useSelector((state) => state.posts.filter.search);

  useEffect(() => {
    if (stateBar === "") {
      setSearchInput("");
    }
  }, [stateBar]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    dispatch(setFilterSearch(searchInput));
    dispatch(setFilterCategory("all"));
  };

  return (
    <Input
      onChange={handleChange}
      value={searchInput}
      placeholder="Search notes..."
    />
  );
};

export default Search;
