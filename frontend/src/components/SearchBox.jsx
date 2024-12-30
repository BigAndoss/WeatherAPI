import React from "react";
import { Input } from "@chakra-ui/react";

const SearchBox = ({ time, date, month, year }) => {
  return (
    <Input
      placeholder="Enter a City Name 🔍"
      borderColor={"whiteAlpha.100"}
      borderRadius={10}
      bgColor={"whiteAlpha.700"}
      maxWidth={300}
      textAlign={"center"}
      color={"Gray"}
      fontWeight={"bold"}
      fontSize={"xl"}
    ></Input>
  );
};

export default SearchBox;
