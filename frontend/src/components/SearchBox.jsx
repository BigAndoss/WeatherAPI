import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { useWeatherStore } from "../store/weather.shared.js";

const SearchBox = ({ time, date, month, year }) => {
  const setCity = useWeatherStore((state) => state.setCity);
  const getWeather = useWeatherStore((state) => state.getWeather);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    setCity(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    setInputValue("");
    await getWeather();
  };

  return (
    <Flex>
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
        value={inputValue}
        onChange={handleInputChange}
      ></Input>
      <Button
        bgColor={"transparent"}
        fontSize={"xl"}
        _hover={{ fontSize: "2xl", transition: "0.3s ease-in-out" }}
        maxWidth={30}
        onClick={handleButtonClick}
      >
        🔍
      </Button>
    </Flex>
  );
};

export default SearchBox;
