import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";

const StyleColorMode = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button
        mt="auto"
        size="sm"
        onClick={toggleColorMode}
        position="fixed"
        bottom={5}
       
      >
        Theme
      </Button>
    </>
  );
};

export default StyleColorMode;
