import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Slices/authSlice";
import {
  Button,
  useDisclosure,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import LoginContainer from "./LoginContainer";
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
        rightIcon={
          <LockIcon
            fontSize={["xs", "sm"]}
            marginBottom={1}
            marginRight={[2, 2, 0]}
          />
        }
      >
        <Text
          ml={[0, 0, 2]}
          fontSize="sm"
          w={["0", "0", "100%"]}
          overflow="hidden"
        >
          {isLogIn.token ? "Log Out" : "Sign In"}
        </Text>
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <LoginContainer onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Login;
