import React, { useState } from "react";
import { Container, Flex } from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import CityInfo from "../components/CityInfo";
import { format } from "date-fns";
import useWeatherStore from "../../store";

const HomePage = () => {
  const now = new Date();
  const time = format(now, "HH:mm");
  const day = format(now, "EEEE");
  const date = format(now, "dd");
  const month = format(now, "MMMM");
  const year = format(now, "yyyy");

  const { cityInfo } = useWeatherStore();

  return (
    <Container>
      <Flex
        h={"80vh"}
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        flexDir={"column"}
      >
        <SearchBox date={date} month={month} year={year} />
        <Flex>
          <CityInfo
            time={time}
            day={day}
            date={date}
            month={month}
            year={year}
            city={cityInfo.city}
            temperature={cityInfo.temperature}
            condition={cityInfo.condition}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomePage;
