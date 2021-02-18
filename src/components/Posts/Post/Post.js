import React from "react";
import {
  Button,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  Center,
  Lorem,
  Text,
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
    <Box
      p={3}
      // h="13rem"
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex justifyContent="space-between">
        <Checkbox />
        <Center fontWeight="semibold" as="h1" lineHeight="tight" isTruncated>
          {title}
        </Center>
        <Box>
          <Button onClick={handleDelete}>D</Button>
          <Button
            onClick={() => {
              dispatch(setCurrentId(id));
              onOpen();
            }}
          >
            E
          </Button>
        </Box>
      </Flex>

      <Box mt={3} mb={3} fontSize={["md", "lg", "sm"]}>
        <Text isTruncated w="100%" noOfLines={4} minH="80px">
          {description}, Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Vero odio cum corrupti quaerat? Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. 
        </Text>
      </Box>
      <Box opacity={0.4}>{time}</Box>

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
  );
};

export default Post;
