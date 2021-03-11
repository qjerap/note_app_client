import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, signIn } from "./Slices/authSlice";
import {
  Container,
  Flex,
  ButtonGroup,
  Grid,
  Heading,
  Image,
  Box,
} from "@chakra-ui/react";
import loginSvg from "./assets/auth.svg";
import Search from "./components/Filter/SearchBar";
import CategorySelector from "./components/Filter/CategorySelector";
import Notes from "./components/Notes/Notes";
import ProgressBar from "./components/ProgressBar";
import Toggle from "./components/ToggleTheme";
import Add from "./components/NotesForm/FormModal";
import Auth from "./components/Login/LoginModal";
import decode from "jwt-decode";

function App() {
  const user = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

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

  return (
    <Container maxW="824px" p={[4, 8]}>
      <Flex justifyContent="space-between" alignItems="center" mb={[3, 6]}>
        <Heading size="sm" fontWeight="500" opacity={0.75}>
          {user.profile?.name}
        </Heading>
        <ButtonGroup>
          <Toggle />
          <Auth />
        </ButtonGroup>
      </Flex>
      <Search />
      <Flex justifyContent="space-between" mt={[3, 6]} mb={[3, 6]}>
        <CategorySelector />
        <Add disabled={user.token ? false : true} />
      </Flex>
      <ProgressBar />
      {user.token ? (
        <Notes />
      ) : (
        <Grid>
          <Heading
            margin={12}
            textAlign="center"
            fontSize="2xl"
            fontWeight="400"
            opacity={0.75}
          >
            <strong>NoteWorld</strong> - Your digital notebook
            <Box mt={3}>Sign in and start planing your day</Box>
          </Heading>

          <Image src={loginSvg} m="auto" w="50%" />
        </Grid>
      )}
    </Container>
  );
}

export default App;
