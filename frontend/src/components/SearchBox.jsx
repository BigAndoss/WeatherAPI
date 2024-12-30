import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import useWeatherStore from "../../store";

const SearchBox = ({ date, month, year }) => {
  const [cityName, setCityName] = useState("");
  const updateCityInfo = useWeatherStore((state) => state.updateCityInfo);

  // Function to convert month name to numeric format
  const convertMonthToNumber = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return String(months.indexOf(monthName) + 1).padStart(2, "0");
  };

  const fetchWeatherData = async () => {
    const numericMonth = convertMonthToNumber(month); // Convert month name to number

    try {
      const response = await fetch(
        `http://localhost:3000/api/weather/citynow?cityName=${cityName}&date=${year}-${numericMonth}-${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      updateCityInfo({
        city: data.city,
        temperature: `${data.temperature}°C`,
        condition: data.condition,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <div>
      <Input
        placeholder="Enter a City Name 🔍"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        borderColor={"whiteAlpha.100"}
        borderRadius={10}
        bgColor={"whiteAlpha.700"}
        maxWidth={300}
        textAlign={"center"}
        color={"Gray"}
        fontWeight={"bold"}
        fontSize={"xl"}
      />
      <Button onClick={fetchWeatherData} mt={4} colorScheme="blue">
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
