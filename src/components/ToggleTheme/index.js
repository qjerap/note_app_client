import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";

const StyleColorMode = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button mt={8} size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </>
  );
};

export default StyleColorMode;
