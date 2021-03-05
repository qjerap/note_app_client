import React, { useState } from "react";
import { Heading, Grid, Box, useColorModeValue } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import GoogleLoginButton from "./googleLogin";
import JWTLogin from "./JWTLogin";

const Auth = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const bg = useColorModeValue("blue.400", "blue.200");

  return (
    <Grid
      gridTemplateColumns="1fr"
      gridGap={5}
      w="80%"
      m="auto"
      textAlign="center"
      m="2rem auto"
    >
      <LockIcon
        bg={"blue.400"}
        color="White"
        borderRadius="50%"
        w="3rem"
        h="3rem"
        m="auto"
        p={2}
      />
      <Heading size="lg" opacity={0.75}>
        {isSignUp ? "Sign up" : "Sign in"}
      </Heading>

      <JWTLogin
        onClose={props.onClose}
        setIsSignUp={setIsSignUp}
        isSignUp={isSignUp}
      />

      {/*
        
      <Box borderTop="2px" borderColor={bg}></Box>
      <GoogleLoginButton onClose={props.onClose} /> 
    
    */ }
      
    </Grid>
  );
};

export default Auth;
