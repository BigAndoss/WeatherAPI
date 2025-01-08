import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const SearchBox = ({setC, getWeather}) => {

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    
    setC(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    setInputValue("");
    getWeather();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <Flex>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        borderColor={"whiteAlpha.100"}
        borderRadius={10}
        bgColor={"whiteAlpha.700"}
        maxWidth={300}
        textAlign={"center"}
        color={"Gray"}
        fontWeight={"bold"}
        fontSize={"xl"}
      />

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
