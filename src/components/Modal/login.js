import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Slices/authSlice";
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
import { LockIcon } from "@chakra-ui/icons";

const Login = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogIn = useSelector((state) => state.auth);

  const handleClick = () => {
    if (isLogIn.token) {
      return dispatch(logOut());
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Button
        colorScheme={isLogIn.token ? "gray" : "blue"}
        onClick={handleClick}
        w="fit-content"
        rightIcon={<LockIcon fontSize={["xs", "sm"]} marginBottom={1} />}
      >
        <Text
          ml={[0, 0, 2]}
          fontSize="sm"
          w={["0", "0", "100%"]}
          overflow="hidden"
        >
          {isLogIn.token ? "Sign out" : "Sign In"}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="1%">
          <LoginComp onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
