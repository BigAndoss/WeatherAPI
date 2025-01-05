import { Container, Flex } from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import React from "react";
import CityInfo from "../components/CityInfo";
import { format } from 'date-fns';


const HomePage = () => {

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
      <SearchBox time={time} date={date} month={month} year={year} />
      <Flex>
        <CityInfo time={time} day={day} date={date} month={month} year={year}  />
      </Flex>
    </Flex>
  </Container>
  );
};

export default HomePage;