import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, signIn } from "../../Slices/authSlice";
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
import decode from "jwt-decode";


const Login = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogIn = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.notes.notes);



    // After app is loaded || notes is updated
    useEffect(() => {
      //CHECK IF User profile/token is saved in localstorage, if so, Sign In
      const getUser = JSON.parse(localStorage.getItem("profile"));
      if (getUser != null) dispatch(signIn(getUser));
  
      //CHECK IF Token is expired. IF it is, Sign Out
      // const token = user?.token;
      // if (token) {
      //   const decodedToken = decode(token);
      //   console.log(decodedToken.exp * 1000, new Date().getTime());
      //   if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
      // }
    }, [notes]);

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
