import React from "react";
import { useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const StyleColorMode = () => {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(
    () => <SunIcon />,
    () => <MoonIcon color="blue.100"/>
  );

  return (
    <>
      <Button onClick={toggleColorMode}>
        <Icon />
      </Button>
    </>
  );
};

export default StyleColorMode;
