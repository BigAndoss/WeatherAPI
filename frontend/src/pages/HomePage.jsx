import { Container, Flex } from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import React from "react";
import CityInfo from "../components/CityInfo";

const HomePage = () => {
  return (
    <Container>
      <Flex
        h={"80vh"}
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        flexDir={"column"}
      >
        <SearchBox />
        <Flex>
          <CityInfo />
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomePage;
