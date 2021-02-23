import React from "react";
import {
  Button,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Checkbox,
  Center,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import Form from "../../Form/Form";
import { useDispatch } from "react-redux";
import {
  deletePostAsync,
  setCompletedAsync,
  setCurrentId,
} from "../../../Slices/postsSlice";

const Post = ({ title, description, id, date, creator, completed }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePostAsync(id));
  };
  const handleCheck = (e) => {
    dispatch(
      setCompletedAsync(id, {
        title,
        description,
        _id: id,
        date,
        creator,
        completed: e.target.checked,
      })
    );
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
        <Checkbox
          value="completed"
          onChange={handleCheck}
          isChecked={completed}
        />
        <Center
          fontWeight="semibold"
          as="h1"
          lineHeight="tight"
          isTruncated
          textDecoration={completed && "line-through"}
          opacity={completed && 0.35}
        >
          {title}
        </Center>
        <Box>
          <Button
            bg="transparent"
            opacity={completed ? 0.35 : 0.75}
            onClick={() => {
              dispatch(setCurrentId(id));
              onOpen();
            }}
          >
            <EditIcon />
          </Button>
          <Button bg="transparent" opacity={0.75} onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Box>
      </Flex>

      <Box mt={3} mb={3} fontSize={["md", "lg", "sm"]}>
        <Text
          isTruncated
          w="100%"
          noOfLines={4}
          minH="80px"
          opacity={completed && 0.35}
          textDecoration={completed && "line-through"}
          whiteSpace="pre-line"
        >
          {description}
        </Text>
      </Box>
      <Box opacity={0.35}>{time}</Box>

      <Modal
        isCentered
        size={["3xl"]}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          dispatch(setCurrentId(""));
        }}
      >
        <ModalOverlay />
        <ModalContent borderRadius="1%">
          <Form onClose={onClose}/>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Post;
