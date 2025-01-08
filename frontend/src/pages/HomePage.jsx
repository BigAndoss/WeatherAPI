import { Container, Flex } from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import React from "react";
import CityInfo from "../components/CityInfo";
import { format } from "date-fns";
import { useWeatherStore } from "../store/weather.shared";

const HomePage = () => {
  const setC = useWeatherStore((state) => state.setCity);
  const weatherData = useWeatherStore((state) => state.weatherData);
  const isLoading = useWeatherStore((state) => state.isLoading);
  const getWeather = useWeatherStore((state) => state.getWeather);

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
      >
        <SearchBox setC={setC} getWeather={getWeather} />
        <Flex>
         
            <CityInfo
                time={time}
                day={day}
                date={date}
                month={month}
                year={year}
                weatherData={weatherData}
                isLoading={isLoading}
                getWeather={getWeather}
              />
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomePage;
