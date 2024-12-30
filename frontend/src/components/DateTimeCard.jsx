import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const DateTimeCard = ({ time, day, date, month, year }) => {
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
        <Text fontSize={50}>{time}</Text>
        <Box direction={"row"}>
          <Text>{day}</Text>
          <Flex width={100} justifyContent={"space-between"}>
            <Text>{date}</Text>
            <Text>{month}</Text>
          </Flex>
          <Text>{year}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DateTimeCard;
