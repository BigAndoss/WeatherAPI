import React from "react";
import { Container, Flex, Text, Box, Image } from "@chakra-ui/react";
import DateTimeCard from "./DateTimeCard";

const CityInfo = ({ time, day, date, month, year, city, temperature, condition }) => {
  return (
    <Container alignItems={"center"} justifyContent={"center"} justifyItems={"center"}>
      <Text
        marginTop={10}
        textAlign={"center"}
        color={"rgba(60,60,60)"}
        fontWeight={"bold"}
        fontSize={"60px"}
      >
        {city}
      </Text>

      <Box width={400} height={200}>
        <Flex alignItems={"center"} justifyContent={"center"} flexDir={"row"}>
          <Image src={`/animated/${condition.toLowerCase()}-6.svg`} boxSize={"200px"}></Image>
          <Text
            textAlign={"center"}
            color={"rgba(60,60,150)"}
            fontWeight={"bold"}
            fontSize={"40px"}
          >
            {temperature}
          </Text>
        </Flex>
      </Box>
      <DateTimeCard time={time} day={day} date={date} month={month} year={year} />
    </Container>
  );
};

export default CityInfo;
