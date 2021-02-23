import React from "react";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import Search from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import Posts from "./components/Posts/Posts";
import ProgressBar from "./components/ProgressBar";
import Toggle from "./components/ToggleTheme";
import Add from "./components/Modal/add";

function App() {
  const bg = useColorModeValue("teal.100", "teal.900");

  return (
    <React.Fragment>
      <Container maxW="824px" p={[2, 8]}>
        <Search />
        <Flex justifyContent="space-between" mt={[3, 6]} mb={[3, 6]}>
          <CategorySelector />
          <Add />
        </Flex>
        <ProgressBar />
        <Posts />
        <Toggle />
      </Container>
    </React.Fragment>
  );
}

export default App;
