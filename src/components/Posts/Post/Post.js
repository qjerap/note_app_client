import React from "react";
import {
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
} from "@chakra-ui/react";

import Form from "../../Form/Form";
import { useDispatch } from "react-redux";
import { deletePostAsync, setCurrentId } from "../../../Slices/postsSlice";

const Post = ({ title, description, id, date }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log(`post ${id} deleted`);
    dispatch(deletePostAsync(id));
  };

  const time = new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box p={3} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title}
      </Box>
      <Box>{description}</Box>
      <Box>{time}</Box>

      <Button onClick={handleDelete}>delete</Button>

      <Box>
        <Button
          onClick={() => {
            dispatch(setCurrentId(id));
            onOpen();
          }}
        >
          edit
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            dispatch(setCurrentId(""));
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <Form />
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Post;
