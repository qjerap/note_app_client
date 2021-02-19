import React from "react";
import {
  Container,
  Flex,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Search from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import ProgressBar from "./components/ProgressBar";
import Toggle from "./components/ToggleTheme";

function App() {
  const bg = useColorModeValue("teal.100", "teal.900");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <Container maxW="824px" p={[2, 8]}>
        <Search />
        <Flex justifyContent="space-between" mt={[3, 6]} mb={[3, 6]}>
          <CategorySelector />
          <Button onClick={onOpen}>
            <AddIcon fontSize={["xs", "sm"]} />{" "}
            <Text
              ml={[0, 0, 2]}
              fontSize="sm"
              w={["0", "0", "100%"]}
              overflow="hidden"
            >
              ADD NOTE
            </Text>
          </Button>
        </Flex>
        <ProgressBar />
        <Posts />
        <Toggle />
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Form />
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default App;
