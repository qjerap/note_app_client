import React from "react";
import { useSelector } from "react-redux";

import {
  Button,
  useDisclosure,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import Form from "./Form";

const Add = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogIn = useSelector((state) => state.auth);

  return (
    <>
      <Button
        disabled={props.disabled}
        onClick={onOpen}
        rightIcon={
          <AddIcon fontSize={["xs"]} marginBottom={1} marginRight={[2, 2, 0]} />
        }
      >
        <Text fontSize="sm" w={["0", "0", "100%"]} overflow="hidden">
          Add Note
        </Text>
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} isCentered size={["md"]}>
        <DrawerOverlay />
        <DrawerContent>
          <Form onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Add;
