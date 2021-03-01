import React, { useState } from "react";
import { Heading, Grid, useToast } from "@chakra-ui/react";

const Auth = (props) => {
  const [signUp, setSignUp] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClose();
    toast({
      title: "Welcome!",
      description: "Let's plan our day",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <form action="POST" onSubmit={handleSubmit} autoComplete="off">
      <Grid
        gridTemplateColumns="1fr"
        gridGap={2}
        w="60%"
        m="auto"
        textAlign="center"
        m="auto"
      >
        <Heading size="lg">{signUp ? "Sign up" : "Log in"}</Heading>

        <input type="text" placeholder="username" name="username" />
        {signUp && <input type="email" placeholder="email" name="email" />}
        <input type="password" placeholder="password" name="password" />
        {signUp && (
          <input
            type="password"
            placeholder="confirm password"
            name="confirmedPassword"
          />
        )}
        <button type="submit">{signUp ? "Sign up" : "Login"}</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSignUp(!signUp);
          }}
        >
          {signUp
            ? "already sign up? Login!"
            : "Don't have an account yet? Signup!"}
        </button>
      </Grid>
    </form>
  );
};

export default Auth;
