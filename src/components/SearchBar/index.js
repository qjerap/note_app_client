import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSearch, setFilterCategory } from "../../Slices/postsSlice";

const Search = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);

  const handleChange = (e) => {
    dispatch(setFilterCategory("all"));
    dispatch(setFilterSearch(e.target.value));
  };

  return <Input onInput={handleChange} placeholder="Search notes..." />;
};

export default Search;
