import React from "react";
import {
  Container,
  Grid,
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
      <Container
        maxW="8xl"
        centerContent
        w={["100%", "100%", "100%", "80%"]}
        p={8}
      >
        <Search />

        <Container>
          <CategorySelector />

          <Box>
            <Button onClick={onOpen}>CREATE</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <Form />
              </ModalContent>
            </Modal>
          </Box>
        </Container>

        <Posts />

        <Toggle />
      </Container>
    </React.Fragment>
  );
}

export default App;
