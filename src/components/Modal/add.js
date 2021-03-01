import React from "react";
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

  return (
    <>
      <Button 
      disabled={props.disabled}
      onClick={onOpen}>
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={["3xl"]}>
        <ModalOverlay />
        <ModalContent borderRadius="1%">
          <Form onClose={onClose}/>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Add;
