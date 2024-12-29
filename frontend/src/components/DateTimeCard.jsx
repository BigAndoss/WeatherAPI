import React from "react";
import { Box,Flex,Text } from "@chakra-ui/react";
const DateTimeCard = () => {
  return (
    <Box
      width={300}
      height={100}
      bgColor={"whiteAlpha.600"}
      rounded={"2xl"}
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
  );
};

export default DateTimeCard;
