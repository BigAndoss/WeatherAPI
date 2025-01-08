import React from "react";
import {
  Container,
  Flex,
  Text,
  Box,
  Link,
  Button,
  Grid,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import SearchBox from "@/components/SearchBox";
import CityInfo from "@/components/CityInfo";
import { useWeatherStore } from "../store/weather.shared";
import { format } from "date-fns";

const APIsPage = () => {
  const setC = useWeatherStore((state) => state.setCountry);
  const weatherData = useWeatherStore((state) => state.weatherData);
  const isLoading = useWeatherStore((state) => state.isLoading);
  const getWeather = useWeatherStore((state) => state.getWeatherForCountry);

  const now = new Date();
  const time = format(now, "HH:mm");
  const day = format(now, "EEEE");
  const date = format(now, "dd");
  const month = format(now, "MMMM");
  const year = format(now, "yyyy");
  return (
    <Container>
      <Flex
        h={"80vh"}
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        flexDir={"column"}
        w={"100%"}
        gap={4}
      >
        <SearchBox setC={setC} getWeather={getWeather} />

        {Array.isArray(weatherData) ? (
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
            overflowY="auto"
            maxH="80vh"
          >
            {weatherData.map((element, index) => (
              <CityInfo
                key={`${element.city}-${element.date}-${index}`}
                time={time}
                day={day}
                date={date}
                month={month}
                year={year}
                weatherData={element}
                isLoading={isLoading}
                getWeather={getWeather}
              />
            ))}
          </Grid>
        ) : (
          <Text
            marginTop={10}
            textAlign={"center"}
            color={"rgba(60,60,60)"}
            fontWeight={"bold"}
            fontSize={"40px"}
          >
            No Data
          </Text>
        )}
      </Flex>
    </Container>
  );
};

export default APIsPage;
