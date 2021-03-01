import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Heading,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import LoginComp from "../Login";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center>
      <Flex
        flexDirection="column"
        mt={5}
        h="100px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading margin={12} fontSize="3xl" opacity={0.75} fontWeight="400">
          Log in to start using the note app
        </Heading>
        <Button onClick={onOpen} w="fit-content" p={3}>
          <Text fontSize="sm">LOG IN</Text>
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="1%">
          <LoginComp onClose={onClose} />
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default Login;
