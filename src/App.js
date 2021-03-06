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
  SlideFade,
} from "@chakra-ui/react";
import loginSvg from "./assets/auth.svg";
import Search from "./components/Filter/SearchBar";
import CategorySelector from "./components/Filter/CategorySelector";
import Notes from "./components/Notes/Notes";
import ProgressBar from "./components/ProgressBar";
import ToggleThemeBtn from "./components/ToggleTheme";
import AddNoteBtn from "./components/NotesForm/FormModal";
import AuthBtn from "./components/Login/LoginModal";

function App() {
  const user = useSelector((state) => state.auth);

  return (
    <Container maxW="824px" p={[4, 8]}>
      <Flex justifyContent="space-between" alignItems="center" mb={[3, 6]}>
        <Heading size="sm" fontWeight="500" opacity={0.75}>
          {user.profile.name}
        </Heading>
        <ButtonGroup>
          <ToggleThemeBtn />
          <AuthBtn />
        </ButtonGroup>
      </Flex>

      <Search />

      <Flex justifyContent="space-between" mt={[3, 6]} mb={[3, 6]}>
        <CategorySelector />
        <AddNoteBtn disabled={user.token ? false : true} />
      </Flex>

      <ProgressBar />

      {user.token ? (
        <Notes />
      ) : (
        <SlideFade offsetY="20px" in={true}>
          <Grid>
            <Heading
              height="100px"
              margin={12}
              textAlign="center"
              fontSize={["xl", "2xl"]}
              fontWeight="400"
              opacity={0.75}
            >
              <strong>NoteWorld</strong> - digital notebook
              <Box mt={3} fontSize={["md", "2xl"]}>
                Sign in and start planing your day
              </Box>
            </Heading>

            <Image src={loginSvg} m="auto" w={["100%", "60%"]} />
          </Grid>
        </SlideFade>
      )}
    </Container>
  );
}

export default App;
