import {
  Box,
  Container,
  Flex,
  Input,
  Image,
  Text,
  Span,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import React from "react";

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
        <Input
          placeholder="Enter a City Name"
          borderColor={"whiteAlpha.100"}
          borderRadius={10}
          bgColor={"whiteAlpha.700"}
          maxWidth={300}
          textAlign={"center"}
          color={"Gray"}
          fontWeight={"bold"}
          fontSize={"xl"}
        ></Input>
        <Container
          alignItems={"center"}
          justifyContent={"center"}
          // justifyContent={"space-between"}
          justifyItems={"center"}
        >
          <Text
            marginTop={10}
            textAlign={"center"}
            color={"rgba(60,60,60)"}
            fontWeight={"bold"}
            fontSize={"60px"}
          >
            Ferizaj
          </Text>

          <Box width={400} height={200}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Image src="/animated/cloudy-day-2.svg" boxSize={"200px"}></Image>
              <Text
                textAlign={"center"}
                color={"rgba(60,60,150)"}
                fontWeight={"bold"}
                fontSize={"40px"}
              >
                20°c
              </Text>
            </Flex>
          </Box>
          <Box
            width={300}
            height={100}
            bgColor={"whiteAlpha.600"}
            borderRadius={15}
            textAlign={"center"}
            color={"rgba(60,60,60)"}
            fontWeight={"bold"}
            fontSize={"md"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-evenly"}
              paddingTop={3}
            >
              <Text fontSize={50}>13:00</Text>
              <Box direction={"row"}>
                <Text>Wednesday</Text>
                <Flex width={100} justifyContent={"space-between"}>
                  <Text>30 </Text>
                  <Text> December</Text>
                </Flex>
                <Text>2024</Text>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Flex>
    </Container>
  );
};

export default HomePage;
