import React from "react";
import { Progress, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const total = useSelector((state) => state.posts.notes.length);
  const completed = useSelector(
    (state) =>
      state.posts.notes.filter((note) => {
        return note.completed === true;
      }).length
  );

  return (
    <Box mt={[3, 6]} mb={[3, 6]}>
      <Text mb={1} fontSize="md" fontWeight={500} opacity={0.4}>
        {" "}
        {completed < total
          ? `You have ${completed}/${total} note${
              completed > 1 ? "s" : ""
            } completed`
          : "You have completed all notes!"}{" "}
      </Text>
      <Progress value={(completed / total) * 100} />
    </Box>
  );
};

export default ProgressBar;
