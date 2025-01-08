import React, { useEffect, useCallback } from "react";
import { Container, Flex, Text, Box, Image } from "@chakra-ui/react";
import DateTimeCard from "./DateTimeCard";

const CityInfo = ({
  weatherData,
  isLoading,
  getWeather,
  time,
  day,
  month,
  year,
  date,
}) => {
  // Memoize the fetch call
  const fetchWeather = useCallback(async () => {
    await getWeather();
  }, [getWeather]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      alignItems={"center"}
      justifyContent={"center"}
      justifyItems={"center"}
      maxW={{ base: "100%", md: "container.md" }}
      p={{ base: 4, md: 6 }}
    >
      <Text
        className="city-name"
        marginTop={10}
        textAlign={"center"}
        color={"rgba(60,60,60)"}
        fontWeight={"bold"}
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
      >
        {weatherData.city}
      </Text>
      <Text
        textAlign={"center"}
        color={"rgba(60,60,60)"}
        fontWeight={"bold"}
        fontSize={"20px"}
      >
        {weatherData.country}
      </Text>

      <Box 
        width={{ base: "100%", md: 400 }} 
        height={{ base: 150, md: 200 }}
      >
        <Flex alignItems={"center"} justifyContent={"center"} flexDir={"row"}>
          {weatherData?.condition && (
            <Image
              src={`/animated/${weatherData?.condition}.svg`}
              boxSize={"200px"}
            ></Image>
          )}

          <Text
            textAlign={"center"}
            color={"rgba(60,60,150)"}
            fontWeight={"bold"}
            fontSize={"40px"}
          >
            {weatherData?.temperature
              ? `${weatherData.temperature}°c`
              : "No data was found"}
          </Text>
        </Flex>
      </Box>
      <DateTimeCard
        time={time}
        day={day}
        date={date}
        month={month}
        year={year}
      />
    </Container>
  );
};

export default CityInfo;
