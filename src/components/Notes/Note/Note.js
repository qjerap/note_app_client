import React from "react";
import {
  Button,
  Box,
  Flex,
  useDisclosure,
  Checkbox,
  Center,
  Text,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import Form from "../../NotesForm/Form";
import { useDispatch } from "react-redux";
import {
  deleteNoteAsync,
  setCompletedAsync,
  setCurrentId,
} from "../../../Slices/notesSlice";

const Note = ({
  title,
  description,
  id,
  date,
  creator,
  completed,
  category,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const borderColorCompleted = useColorModeValue("gray.100", "gray.700");

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNoteAsync(id));
    toast({
      title: `Note deleted`,
      description: `${title}`,
      status: "warning",
      // variant: "subtle",
      duration: 2000,
      isClosable: true,
    });
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
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <React.Fragment>


      <SlideFade
      offsetY="20px"
      in={true}
      >
        <Box
          p={3}
          borderColor={
            (completed === true && borderColorCompleted) ||
            (category === "home" && "teal.100") ||
            (category === "work" && "purple.100") ||
            (category === "personal" && "pink.100")
          }
          // h="13rem"
          w="100%"
          borderWidth="1px"
          borderRadius="sm"
          shadow={completed ? "none" : "md"}
          overflow="hidden"
          transition="all 0.3s"
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
              color={
                (completed === true && "gray") ||
                (category === "home" && "teal.300") ||
                (category === "work" && "purple.300") ||
                (category === "personal" && "pink.300")
              }
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
        </Box>
      </SlideFade>


      <Drawer
        isCentered
        size={["md"]}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          dispatch(setCurrentId(""));
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Form onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default Note;
