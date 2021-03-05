import React from "react";
import { Progress, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const total = useSelector((state) => state.posts.notes.length);
  const user = useSelector((state) => state.auth.token);

  const completed = useSelector(
    (state) =>
      state.posts.notes.filter((note) => {
        return note.completed === true;
      }).length
  );

  return (
    <Box mt={[3, 6]} mb={[3, 6]}>
      <Text
        mb={1}
        fontSize="md"
        fontWeight={500}
        opacity={total <= 0 || user <= 0 ? 0 : 0.4}
        userSelect={total <= 0 && "none"}
      >
        {completed < total
          ? `You have ${completed}/${total} note${
              completed > 1 ? "s" : ""
            } completed`
          : "You have completed all notes!"}
      </Text>
      <Progress
        value={total > 0 && user.length > 0 ? (completed / total) * 100 : 0}
      />
    </Box>
  );
};

export default ProgressBar;
