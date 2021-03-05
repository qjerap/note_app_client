import React from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Form from "../Form/Form";

const Add = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogIn = useSelector((state) => state.auth);

  return (
    <>
      <Button
        colorScheme={isLogIn.token ? "blue" : "gray"}
        disabled={props.disabled}
        onClick={onOpen}
        leftIcon={<AddIcon fontSize={["xs", "sm"]} marginBottom={1} />}
      >
        <Text fontSize="sm" w={["0", "0", "100%"]} overflow="hidden">
          Add Note
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={["3xl"]}>
        <ModalOverlay />
        <ModalContent borderRadius="1%">
          <Form onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Add;
