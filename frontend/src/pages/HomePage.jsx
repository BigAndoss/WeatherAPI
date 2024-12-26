import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

const HomePage = () => {
  return (
    <Container>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        // justifyContent={"space-between"}
        justifyItems={"center"}
        flexDir={{ base: "row", sm: "column" }}
      >
        <h1>
          2
        </h1>
        <h2>3</h2>

      </Flex>
    </Container>
  );
};

export default HomePage;
