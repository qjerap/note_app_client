import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useToast, Button } from "@chakra-ui/react";
import { signInAsync } from "../../Slices/authSlice";

const GoogleLoginButton = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;

    try {
      dispatch(signInAsync({ result, token }));
      toast({
        title: "Welcome!",
        description: "Let's plan our day",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops...",
        description: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    props.onClose();
  };
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later.");
  };

  return (
    <GoogleLogin
      clientId="8358255505-q8i20eglqc2nq37ach7orrjuo1ugh490.apps.googleusercontent.com"
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy="single_host_origin"
      render={(renderProps) => (
        <Button
          colorScheme="blue"
          variant="outline"
          fontSize="sm"
          onClick={renderProps.onClick}
        >
          Sign In with Google
        </Button>
      )}
    />
  );
};

export default GoogleLoginButton;
