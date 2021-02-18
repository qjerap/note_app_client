import React from "react";
import {
  Container,
  Grid,
  Flex,
  GridItem,
  useColorModeValue,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Lorem,
} from "@chakra-ui/react";
import Search from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
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
          <Button onClick={onOpen}>CREATE</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <Form />
            </ModalContent>
          </Modal>
        </Flex>

        <Posts />

        <Toggle />
      </Container>
    </React.Fragment>
  );
}

export default App;
