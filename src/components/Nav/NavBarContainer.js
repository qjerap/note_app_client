import React from "react";
import { Flex } from "@chakra-ui/react";

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w={["100%", "100%", "100%", "80%"]}
      maxW="8xl"
      margin={["0", "auto", "auto", "auto"]}
      mb={8}
      p={8}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBarContainer;
