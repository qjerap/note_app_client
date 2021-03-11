import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Grid,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {  signInAsync, signUpAsync } from "../../Slices/authSlice";


const JWTLogin = ({ isSignUp, setIsSignUp, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUpAsync(formData));
    } else {
      dispatch(signInAsync(formData));
    }
    onClose();
    toast({
      title: "Welcome!",
      description: "Let's plan our day",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action="POST" onSubmit={handleSubmit} autoComplete="on">
      <Grid gridGap={3}>
        {isSignUp && (
          <>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </FormControl>
          </>
        )}

        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </FormControl>

        <FormControl position="relative" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <Box
            position="absolute"
            right={-8}
            top="50%"
            // transform="translateY(-50%)"
            cursor="pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Box>
        </FormControl>
        {isSignUp && (
          <FormControl isRequired>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmedPassword"
              onChange={handleChange}
              value={formData.confirmedPassword}
            />
          </FormControl>
        )}
        <Button colorScheme="blue" type="submit" fontSize="sm" mt={3}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          colorScheme="blue"
          variant="ghost"
          fontSize="sm"
          onClick={(e) => {
            e.preventDefault();
            setIsSignUp(!isSignUp);
          }}
        >
          {isSignUp
            ? "already sign up? Log in!"
            : "Don't have an account yet? Sign up!"}
        </Button>
      </Grid>
    </form>
  );
};

export default JWTLogin;
