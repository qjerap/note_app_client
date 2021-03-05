import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./Slices/authSlice";
import {
  Container,
  Flex,
  useColorModeValue,
  ButtonGroup,
  Grid,
  Heading,
  Image,
  Box,
} from "@chakra-ui/react";
import loginSvg from "./assets/auth.svg";
import Search from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import Posts from "./components/Posts/Posts";
import ProgressBar from "./components/ProgressBar";
import Toggle from "./components/ToggleTheme";
import Add from "./components/Modal/add";
import Auth from "./components/Modal/login";

function App() {
  const bg = useColorModeValue("teal.100", "teal.900");
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const user = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    // const token = user?.token;

    //JWT
    const getUser = JSON.parse(localStorage.getItem("profile"));
    getUser && dispatch(signIn(getUser));
  }, []);

  return (
    <React.Fragment>
      <Container maxW="824px" p={[2, 8]}>
        <Search />
        <Flex justifyContent="space-between" mt={[3, 6]} mb={[3, 6]}>
          <CategorySelector />
          <ButtonGroup isAttached>
            <Add disabled={user ? false : true} />
            <Auth />
          </ButtonGroup>
        </Flex>
        <ProgressBar />
        {user ? (
          <Posts />
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
        <Toggle />
      </Container>
    </React.Fragment>
  );
}

export default App;
