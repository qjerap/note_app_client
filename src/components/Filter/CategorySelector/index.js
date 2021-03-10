import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory, setFilterSearch } from "../../../Slices/postsSlice";

const CategorySelector = () => {
  const notes = useSelector((state) => state.posts.notes);
  const user = useSelector((state) => state.auth.token);
  const search = useSelector((state) => state.posts.filter.search);

  const dispatch = useDispatch();

  const [activeBtn, setActiveBtn] = useState("all");

  //if Search bar is used => set Category to all
  //on SignOut => set Category to all
  useEffect(() => {
    if (search) {
      setActiveBtn("all");
    }
    if (!user) {
      setActiveBtn("all");
      dispatch(setFilterCategory("all"));
    }
  }, [search, user]);

  const bg = useColorModeValue("gray.50", "whiteAlpha.300");

  const setFilter = (e) => {
    dispatch(setFilterCategory(e.target.value));
    dispatch(setFilterSearch(""));
    setActiveBtn(e.target.value);
  };

  const ButtonStyle = {
    disabled: notes.length > 0 && user.length > 0 ? false : true,
    color: "blackAlpha.700",
  };

  return (
    <div>
      <ButtonGroup isAttached borderRadius="md" shadow="md">
        <Button
          isActive={activeBtn === "all" && true}
          _active={{
            bg: bg,
          }}
          color={"green.300"}
          disabled={ButtonStyle.disabled}
          onClick={setFilter}
          value="all"
          // fontSize={ButtonStyle.fontSize}
        >
          All
        </Button>
        <Button
          isActive={activeBtn === "home" && true}
          _active={{
            bg,
          }}
          color={"teal.300"}
          disabled={ButtonStyle.disabled}
          onClick={setFilter}
          value="home"
          fontSize={ButtonStyle.fontSize}
        >
          Home
        </Button>
        <Button
          isActive={activeBtn === "work" && true}
          _active={{ bg }}
          color={"purple.300"}
          disabled={ButtonStyle.disabled}
          onClick={setFilter}
          value="work"
          fontSize={ButtonStyle.fontSize}
        >
          Work
        </Button>
        <Button
          isActive={activeBtn === "personal" && true}
          _active={{
            bg,
          }}
          color={"pink.300"}
          disabled={ButtonStyle.disabled}
          onClick={setFilter}
          value="personal"
          fontSize={ButtonStyle.fontSize}
        >
          Personal
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CategorySelector;
